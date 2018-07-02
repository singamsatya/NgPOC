import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';

@Component({
  selector: 'app-applist',
  templateUrl: './applist.component.html',
  styleUrls: ['./applist.component.scss']
})
export class ApplistComponent implements OnInit {
	public addCounter: number = 0;

  	@Input()
  	parentValue : any;

  	@Output()
 	changeColor: EventEmitter<any> = new EventEmitter<any>();

	constructor() { 
	}

	ngOnInit() {
	}

	addToCart(ev) {
		ev.stopPropagation();

		this.addCounter++;
		this.changeColor.emit(this.addCounter);
	}

	removeFromCart(ev) {
		ev.stopPropagation();

		this.addCounter--;
		this.changeColor.emit(this.addCounter);
	}
}
