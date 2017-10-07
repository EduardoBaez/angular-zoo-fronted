import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { User } from '../../models/user';
import { UserService } from '../../services/user.service';

@Component({
    selector: 'login',
    templateUrl: './login.component.html',
    providers: [
        UserService
    ]
})

export class LoginComponent implements OnInit{
    public titulo: String;
    public user: User;
    public identity;
    public token;
    public status;

    constructor(
        private _route: ActivatedRoute,
        private _router: Router,
        private _userService: UserService
    ){
        this.titulo = 'Iniciar Sesión';
        this.user = new User('', '', '', '', '', 'ROLE_USER', '');
    }

    ngOnInit(){
        console.log('Login Component Cargado');
    }

    onSubmit(){
        // Loguear usuario
        this._userService.signup(this.user).subscribe(
            response => {
                // Guardar usuario que viene en la response en una veriable
                this.identity = response.user;

                if(!this.identity || !this.identity._id){
                   console.log('Login incorrecto');
                }else{
                    this.identity.password = '';
                    localStorage.setItem('identity', JSON.stringify(this.identity));

                    // Conseguir token
                    this._userService.signup(this.user, 'true').subscribe(
                        response => {
                            // Guardar token de la response en una variable
                            this.token = response.token;

                            if(this.token.length <= 0){
                               console.log('El token no se ha generado');
                            }else{
                                localStorage.setItem('token', this.token);
                                this.status = 'success';
                                this._router.navigate(['/']);
                            }
                        },
                        error => {
                            console.log(<any>error);
                        }
                    );                    
                }
            },
            error => {
                var errorMessage = <any>error;
                if(errorMessage != null){
                    var body = JSON.parse(error._body);
                    this.status = 'error';
                }
            }
        );
    }
}