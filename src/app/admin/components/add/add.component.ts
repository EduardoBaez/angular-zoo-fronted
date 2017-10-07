import { Component, OnInit, DoCheck } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Animal } from '../../../models/animal';
import { AnimalService } from '../../../services/animal.service';
import { UserService } from '../../../services/user.service';
import { UploadService } from '../../../services/upload.service';
import { GLOBAL } from '../../../services/global';

@Component({
    selector: 'add',
    templateUrl: './add.component.html',
    providers: [
        AnimalService,
        UserService,
        UploadService
    ]
})

export class AddComponent {
    public titulo: string;
    public animal: Animal;
    public status: string;
    public identity: string;
    public token: string;
    public url: string;

    constructor(
        private _animalService: AnimalService,
        private _userService: UserService,
        private _uploadService: UploadService,
        private _router: Router,
        private _activatedRoute: ActivatedRoute
    ){
        this.titulo = 'Agregar Animal';
        this.animal = new Animal('','','',2017,'','');
        this.identity = this._userService.getIdentity();
        this.token = this._userService.getToken();
        this.url = GLOBAL.url;
    }

    onSubmit(){
        this._animalService.saveAnimal(this.token, this.animal).subscribe(
            response => {
                if(!response.animal){
                    this.status = 'error';
                }else{
                    this.status = 'success';
                    this.animal = response.animal;

                    if(!this.filesToUpload){
                        this._router.navigate(['/admin-panel/listado']);
                    }else{
                        this._uploadService.makeFileRequest(this.url+'upload-image-animal/'+this.animal._id, [], this.filesToUpload, this.token, 'image')
                        .then((result: any) => {
                            this.animal.image = result.image;
                            this._router.navigate(['/admin-panel/listado']);
                        });
                    }
                }
            },
            error => {
                var errorMessage = <any>error;
                if(errorMessage != null){
                    this.status = 'error';
                }
            }
        );
    }

    public filesToUpload: Array<File>;
    fileChangeEvent(fileInput: any){
        this.filesToUpload = <Array<File>>fileInput.target.files;
        console.log(this.filesToUpload);
    }

}