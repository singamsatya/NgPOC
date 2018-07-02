import { Component, ViewChild, OnInit } from '@angular/core';
import { NgModel, FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})

export class RegisterComponent implements OnInit {
	public registerForm: FormGroup;
	public regSuccessMsg: boolean = false;
	public submitBtn: boolean = false;
	public frmVals: any;

	@ViewChild('usernameFld') usernameFld : any;

	constructor() {	}

	ngOnInit() {
		this.registerForm = new FormGroup({
	        username: new FormControl('', { 
                                            validators: Validators.required ,
                                        	updateOn: 'blur'
                                        }),
	        password: new FormControl('', { 
                                            validators: [
                                            	Validators.required,
                                            	Validators.minLength(8)
                                            ],
                                        	updateOn: 'blur'
                                        }),
	        email: new FormControl('', { 
                                            validators: [
                                            	Validators.required,
                                            	this.validateEmail
                                            ],
                                        	updateOn: 'blur'
                                        })
        }, { updateOn : 'submit'});
 	}

 	ngAfterViewInit() {
        //this.usernameFld.nativeElement.focus();
    }

 	validateEmail(control: FormControl) {
 		if (control.value && control.value.toLowerCase().match(/[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/)) {
            return null;
        } else {
        	if(control.value!= '') {
	            return { 'invalidEmailAddress': true };
	        }
        }
 	}
 	registerFrmSubmit(e: any) {
 		e.stopPropagation;

        //this.submitBtn = true;

        if (!(this.registerForm.dirty && this.registerForm.valid)) {
            return;
        } else {
        	this.regSuccessMsg = true;
        	this.registerForm.reset();
        }
 	}
 	registerFrmReset(e: any) {
 		e.stopPropagaton;

 		this.regSuccessMsg = false;
 	}
}
