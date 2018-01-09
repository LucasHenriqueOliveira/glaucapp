import { Injectable } from "@angular/core";
import { Http, Headers, RequestOptions } from "@angular/http";
import { Observable } from "rxjs/Observable";
import "rxjs/add/operator/map";
import { Constants } from "../../app/app.constants";
import { Cadastro } from "./cadastro.model";

@Injectable()
export class CadastroService {
    constants: any = Constants

    constructor(private http: Http){}

    signup(signup: Cadastro): Observable<string> {
        const headers = new Headers();
        headers.append('Content-Type', 'application/json')
         return this.http.post(`${this.constants.api}/signup`, JSON.stringify(signup), new RequestOptions({headers: headers}))
            .map(response => response.json())
    }

}