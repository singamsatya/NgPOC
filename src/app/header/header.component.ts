import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { HeaderService } from '../services/header.service';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
	public tabs: any;
  public getTabName: any;
  public isLoggedIn: any;

  constructor(
    private HeaderService: HeaderService, 
    private router: Router, 
    private AuthService: AuthService
  ) {
  	this.getTabName = HeaderService.getTabNames().subscribe(
                                                    result => this.loadTabs(result),
                                                    err => console.error(err)
                                                    );
    this.isLoggedIn = AuthService.isLoggedIn();
  }

  ngOnInit() { }

  loadTabs(res) {
    this.tabs = res;
  }
  ngOnDestroy() {
    this.getTabName.unsubscribe();
  }
}
