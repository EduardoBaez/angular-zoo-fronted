import { Component, OnInit} from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Animal } from '../../models/animal';
import { AnimalService } from '../../services/animal.service';
import { GLOBAL } from '../../services/global';

@Component({
    selector: 'animal-detail',
    templateUrl: './animal-detail.component.html',
    providers: [
        AnimalService
    ]
})

export class AnimalDetailComponent implements OnInit {
    public animal: Animal;
    public url: string;

    constructor(
        private _animalService: AnimalService,
        private _router: Router,
        private _route: ActivatedRoute
    ){
        this.url = GLOBAL.url;
    }

    ngOnInit(){
        this.getAnimal();
    }

    getAnimal(){
        this._route.params.forEach((params: Params) => {
            let id = params['id'];

            this._animalService.getAnimal(id).subscribe(
                response => {
                    if(!response.animal){
                        this._router.navigate(['/']);
                    }else{
                        this.animal = response.animal;
                    }
                },
                error => {
                    var error = <any>error;
                    this._router.navigate(['/']);
                }
            );
        });

    }
}