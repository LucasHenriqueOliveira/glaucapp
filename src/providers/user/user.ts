import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from "@angular/http";
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/from';
import { Constants } from "../../app/app.constants";
import { Storage } from '@ionic/storage';

/*
  Generated class for the UserProvider provider.
  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/
@Injectable()
export class UserProvider {

	constants: any = Constants
	token: any

	constructor(public http: Http, private storage: Storage) {}
	  
	getUser(): Observable<string> {

		return Observable.fromPromise(this.getToken()).mergeMap(token => {
			this.token = token;
			const headers = new Headers(); 
			
			headers.append('Authorization', 'Bearer ' + this.token)
			headers.append('Content-Type', 'application/json')
			return this.http.get(`${this.constants.api}/auth/user`, new RequestOptions({headers: headers}))
				.map(response => response.json())
		});
	}

	getToken() {
		return this.storage.get('token').then((token) => {
			return token;
		});
	}

	getUserData(): Observable<string> {
		return Observable.fromPromise(this.getUserStorage()).map(user => {
			return user
		});		
	}

	getUserStorage() {
		return this.storage.get('user').then((user) => {
			return user;
		});
	}

	clearStorage(){
    	this.storage.clear().then(() => {
			console.log('logout and clear storage');
    	});
    }
}