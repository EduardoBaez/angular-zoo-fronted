import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { User } from '../../models/user';
import { GLOBAL } from '../../services/global';

@Component({
    selector: 'keeper',
    templateUrl: './keeper.component.html',
    providers: [
        UserService
    ]
})

export class KeeperComponent implements OnInit{
    public titulo: string;
    public keepers: User[];
    public url: string;

    constructor(private _userService: UserService){
        this.titulo = 'Cuidadores del Zoologico';
        this.url = GLOBAL.url;
    }

    ngOnInit(){
        console.log('Keeper Component Cargado');
        this.getKeepers();
    }

    getKeepers(){
        this._userService.getKeepers().subscribe(
            response => {
                if(!response.users){

                }else{
                    this.keepers = response.users;
                }
            },
            error => {
                console.log(<any>error);
            });
    }
}