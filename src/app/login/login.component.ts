import { Component, ViewChild, OnInit } from '@angular/core';
import { NgModel, FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthService } from '../services/auth.service';
import { LoginService } from '../services/login.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})

export class LoginComponent implements OnInit {
    public loginForm: FormGroup;
    public userData: any;
    public loginErrMsg: boolean = false;
    public submitBtn: boolean = false;
    public frmVals: any;

    @ViewChild('usernameFld') usernameFld : any;

    constructor(
        private LoginService: LoginService, 
        private AuthService: AuthService, 
        private router: Router
    ) {}

    ngOnInit() {
        this.loginForm = new FormGroup({
            username: new FormControl('', 
                                        { 
                                            validators: Validators.required,
                                            updateOn: 'blur'
                                        }),
            password: new FormControl('', 
                                  {
                                    validators: [
                                        Validators.required,
                                        Validators.minLength(8)
                                    ],
                                    updateOn: 'blur'
                                  })
        }, { updateOn : 'submit'});
    }

    ngAfterViewInit() {
        //this.usernameFld.nativeElement.focus();
    }

    loginFrmSubmit(e: any) {
        e.stopPropagation();

        this.loginErrMsg = false;
        this.submitBtn = true;

        if (!(this.loginForm.dirty && this.loginForm.valid)) {
            return;
        }

        this.userData = this.LoginService
                            .validateLoginUser(this.loginForm.value.username, this.loginForm.value.password)
                            .subscribe(
                                data => this.validUser(data),
                                err => console.error(err)
                            );
    }

    validUser(data) {
        if(data.length > 0) {
            this.submitBtn = false;

            for(let i = 0; i < data.length; i++) {
                if(this.loginForm.value.username == data[i].username && this.loginForm.value.password == data[i].password) {
                    sessionStorage.setItem('username', this.loginForm.value.username);
                    this.AuthService.loggedUserStatusSub.next(true);
                    this.router.navigateByUrl('/home');
                } else {
                    this.loginErrMsg = true;
                }
            }
        }
    }

    loginFrmReset(e: any) {
        e.stopPropagation();

        this.loginErrMsg = false;
    }
}