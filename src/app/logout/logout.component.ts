import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from '../services/auth.service';

@Component({
	selector: 'app-logout',
  	templateUrl: './logout.component.html',
	styleUrls: ['./logout.component.scss']
})
export class LogoutComponent implements OnInit {

	constructor(
		private router: Router, 
		private AuthService: AuthService
	) {
		sessionStorage.removeItem('username');
		this.AuthService.loggedUserStatusSub.next(false);
		router.navigateByUrl('/login');
	}

	ngOnInit() {}
}