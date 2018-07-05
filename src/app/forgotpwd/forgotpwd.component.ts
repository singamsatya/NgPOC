import { Component, ViewChild, OnInit } from '@angular/core';
import { NgModel, FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { LoginService } from '../services/login.service';

@Component({
  selector: 'app-forgotpwd',
  templateUrl: './forgotpwd.component.html',
  styleUrls: ['./forgotpwd.component.scss']
})

export class ForgotpwdComponent implements OnInit {
	public fgpwdForm: FormGroup;
	public forgotpwdErrMsg: boolean = false;
	public forgotpwdSuccessMsg: boolean = false;
	public submitBtn: boolean = false;
	public frmVals: any;
	public userData: any;

	@ViewChild('usernameFld') usernameFld : any;

	constructor(private LoginService: LoginService) { }

	ngOnInit() {
		this.fgpwdForm = new FormGroup({
	        username: new FormControl('', { 
                                            validators: Validators.required,
                                            updateOn: 'blur'
                                        })
	    }, { updateOn : 'submit'});
	}
  	ngAfterViewInit() {
	    //this.usernameFld.nativeElement.focus();
	}
    fgpwdFrmSubmit(e: any) {
 		e.stopPropagation;

        this.submitBtn = true;        
        this.forgotpwdErrMsg = false;
 		this.forgotpwdSuccessMsg = false;

        if (!(this.fgpwdForm.dirty && this.fgpwdForm.valid)) {
            return;
        } else {
        	this.userData = this.LoginService.validateLoginUser(this.fgpwdForm.value.username, '')
                                    .subscribe(
                                        data => this.validUser(data),
                                        err => console.error(err)
                                    );
        }
 	}
 	validUser(data) {
        if(data.length > 0) {
            this.submitBtn = false;

            for(let i = 0; i < data.length; i++) {
                if(this.fgpwdForm.value.username == data[i].username) {
                    this.forgotpwdSuccessMsg = true;
                    return;
                } else {
                	this.forgotpwdErrMsg = true;
                }
            }
        }
    }
 	fgpwdFrmReset(e: any) {
 		e.stopPropagaton;

 		this.forgotpwdErrMsg = false;
 		this.forgotpwdSuccessMsg = false;
 	}
}
