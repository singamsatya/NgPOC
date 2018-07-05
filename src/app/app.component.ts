import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
	static spinner: boolean = false;

	constructor() {
		//sessionStorage.removeItem('username');
	}

	getSpinner() {
		return AppComponent.spinner;
	}
}
