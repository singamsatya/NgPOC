import { Component, Input, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
	public isLoggedIn: any;
	public username: any;
	public parentId: any;
	public url: any;
	public changeRowColor: any;
	public itemsAdded: number = 0;

	constructor(
		private router: Router, 
		private AuthService: AuthService,
		private route: ActivatedRoute
	) {
		this.isLoggedIn = AuthService.loggedUserStatusSub.getValue();
		this.username = sessionStorage.getItem('username');		
	}

	ngOnInit() {
		this.AuthService.isLoggedIn().subscribe(data => console.log(data));
		if(!this.isLoggedIn) {
			this.router.navigateByUrl('/login');
		}	
	}

	changeItemColor(num) {
		this.itemsAdded = num;
	}
}