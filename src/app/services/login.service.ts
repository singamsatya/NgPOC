import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()

export class LoginService {
	private username: string;
	private password: any;
	private email: string;

    constructor(private http: HttpClient) {}

    validateLoginUser(username : string, password : any) {
    	this.username = username;
    	this.password = password;

		return this.http.get('../assets/jsons/loginUserValidate.json', { /*'username' : this.username, 'password': this.password*/ });
	}
}
