import { Injectable } from "@angular/core";
import { Http, Headers, RequestOptions } from "@angular/http";
import { Observable } from "rxjs/Observable";
import "rxjs/add/operator/map";
import { Constants } from "../../app/app.constants";
import { Login } from "./login.model";

@Injectable()
export class LoginService {
    constants: any = Constants

    constructor(private http: Http){}

    login(login: Login): Observable<string> {
        const headers = new Headers();
        headers.append('Content-Type', 'application/json')
         return this.http.post(`${this.constants.api}/auth/login`, JSON.stringify(login), new RequestOptions({headers: headers}))
            .map(response => response.json())
    }

    esqueceuSenha(email: any): Observable<string> {
        const headers = new Headers();
        headers.append('Content-Type', 'application/json')
         return this.http.post(`${this.constants.api}/usuario/reset`, JSON.stringify(email), new RequestOptions({headers: headers}))
            .map(response => response.json())
    }
}