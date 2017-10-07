import { Component, OnInit } from '@angular/core';
import { AnimalService } from '../../services/animal.service';
import { Animal } from '../../models/animal';
import { GLOBAL } from '../../services/global';

@Component({
    selector: 'animal',
    templateUrl: './animal.component.html',
    providers: [
        AnimalService
    ]
})

export class AnimalComponent implements OnInit{
    public titulo: String;
    public animals: Animal[];
    public url: string;

    constructor(private _animalService: AnimalService){
        this.titulo = 'Conoce a los Animales';
        this.url = GLOBAL.url;
    }

    ngOnInit(){
        console.log('Animal Component Cargado');
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
                console.log(<any>error);
            });
    }
}