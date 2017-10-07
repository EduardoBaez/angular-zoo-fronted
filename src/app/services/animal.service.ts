import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import { GLOBAL } from './global';
import { UserService } from './user.service';

@Injectable()
export class AnimalService {
    public url: String;
    public token: String;

    constructor(private _http: Http, private _userService: UserService){
        this.url = GLOBAL.url;
        this.token = this._userService.getToken();
    }

    saveAnimal(token, animal_to_save){
        let params = JSON.stringify(animal_to_save);
        let headers = new Headers({'Content-Type': 'application/json', 'Authorization':token});

        return this._http.post(this.url+'save-animal', params, {headers: headers}).map(res => res.json());
    }

    getAnimals(){
        return this._http.get(this.url+'list-animals').map(res => res.json());
    }

    getAnimal(id){
        return this._http.get(this.url+'list-animal/'+id).map(res => res.json());
    }

    updateAnimal(token, id, animal_to_update){
        let params = JSON.stringify(animal_to_update);
        let headers = new Headers({'Content-Type':'application/json', 'Authorization': token});

        return this._http.put(this.url+'/update-animal/'+id, params, {headers: headers}).map(res => res.json());
    }

    deleteAnimal(token, id){
        let headers = new Headers({'Content-Type':'application/json', 'Authorization':token});
        let options = new RequestOptions({headers: headers});
        
        return this._http.delete(this.url+'delete-animal/'+id, options).map(res => res.json());
    }
}