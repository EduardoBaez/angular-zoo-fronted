import { Component, OnInit, DoCheck } from '@angular/core';

@Component({
    selector: 'main-admin',
    templateUrl: './main.component.html'
})

export class MainComponent {
    public titulo: String;

    constructor(){
        this.titulo = 'Panel de Administracón'
    }

}