import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'home',
    templateUrl: './home.component.html'
})

export class HomeComponent implements OnInit{
    public titulo: String;

    constructor(){
        this.titulo = 'Home Component';
    }

    ngOnInit(){
        console.log('Home Component Cargado');
    }
}