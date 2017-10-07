import { Component, OnInit } from '@angular/core';
import { User } from '../../models/user';
import { UserService } from '../../services/user.service';

@Component({
    selector: 'register',
    templateUrl: './register.component.html',
    providers: [
        UserService
    ]
})

export class RegisterComponent implements OnInit{
    public titulo: String;
    public user: User;
    public status: String;

    constructor(
        private _userService: UserService
    ){
        this.titulo = 'Registro';
        this.user = new User('', '', '', '', '', 'ROLE_USER', '');
    }

    ngOnInit(){
        console.log('Register Component Cargado');
    }

    onSubmit(registerForm){
        this._userService.register(this.user).subscribe(
            response => {
                if(response.user && response.user._id){
                    this.status = 'success';
                    this.user = new User('', '', '', '', '', 'ROLE_USER', '');
                    registerForm.reset();
                }else{
                    this.status = 'error';
                }
            },
            error => {
                console.log(<any>error);
            }
        );
    }
}