import { Component, OnInit, DoCheck } from '@angular/core';
import { Animal } from '../../../models/animal';
import { AnimalService } from '../../../services/animal.service';
import { UserService } from '../../../services/user.service';

@Component({
    selector: 'list',
    templateUrl: './list.component.html'
})

export class ListComponent implements OnInit {
    public titulo: String;
    public animals: Animal[];
    public token;
    public busqueda;

    constructor(
        private _animalService: AnimalService, private _userService: UserService
    ){
        this.titulo = 'Listado de Animales';
        this.token = this._userService.getToken();
    }

    ngOnInit(){
        console.log('Listado Animales Cargado');
        this.getAnimals();
    }

    getAnimals(){
        this._animalService.getAnimals().subscribe(
            response => {
                if(!response.animals){

                }else{
                    this.animals = response.animals;
                }
            },
            error => {
                console.log(<any>error);            }
        );
    }

    deleteAnimal(id){
        this._animalService.deleteAnimal(this.token, id).subscribe(
            response => {
                if(!response.animal){
                    alert('Error, no hay animal');
                }else{
                    this.busqueda = '';
                    this.getAnimals();
                }
            },
            error => {
                console.log('Error response');
            });
    }
}