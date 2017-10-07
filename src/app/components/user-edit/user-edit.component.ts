import { Component, OnInit } from '@angular/core';
import { User } from '../../models/user';
import { GLOBAL } from '../../services/global';
import { UserService } from '../../services/user.service';
import { UploadService } from '../../services/upload.service';

@Component({
    selector: 'user-edit',
    templateUrl: './user-edit.component.html',
    providers: [
        UserService,
        UploadService
    ]
})

export class UserEditComponent implements OnInit{
    public titulo: String;
    public user: User;
    public identity;
    public token;
    public status;
    public url: string;

    constructor(
        private _userService: UserService,
        private _uploadService: UploadService
    ){
        this.titulo = 'Actualizar Mis Datos';
        this.identity = this._userService.getIdentity();
        this.token = this._userService.getToken();
        this.user = this.identity;
        this.url = GLOBAL.url;
    }

    ngOnInit(){
        console.log('UserEdit Component cargado.');
    }

    onSubmit(){
        this._userService.updateUser(this.user).subscribe(
            response => {
                if(!response.user){
                    this.status = 'error';
                }else{
                    this.status = 'success';
                    localStorage.setItem('identity', JSON.stringify(this.user));

                    //Cargar imagen
                    this._uploadService.makeFileRequest(this.url+'upload-image-user/'+this.user._id, [], this.filesToUpload, this.token, 'image')
                        .then((result: any) => {
                            this.user.image = result.image;
                            localStorage.setItem('identity', JSON.stringify(this.user));
                        });
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