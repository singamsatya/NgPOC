import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable()
export class AuthService {
  	public loggedUserStatusSub = new BehaviorSubject<boolean>(this.hasToken());

  	constructor() {}

	isLoggedIn(): Observable<boolean> {		
		return this.loggedUserStatusSub.asObservable();
	}

	private hasToken() : boolean {
	    return !!sessionStorage.getItem('username');
	}
}