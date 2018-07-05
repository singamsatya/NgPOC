import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable()

export class HeaderService {
	constructor(private http: HttpClient) {}

	getTabNames() {
		return this.http.get('../assets/jsons/headerTabs.json', {});
	}
}