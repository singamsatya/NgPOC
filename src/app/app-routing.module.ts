import { NgModule, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Routes, RouterModule, Router, CanActivate, ActivatedRoute, ActivatedRouteSnapshot, RouterEvent, NavigationStart, NavigationEnd } from '@angular/router';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { LogoutComponent } from './logout/logout.component';
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './register/register.component';
import { ForgotpwdComponent } from './forgotpwd/forgotpwd.component';
import { ApplistComponent } from './applist/applist.component';

import { AuthService } from './services/auth.service';

import 'rxjs/add/operator/filter';


@Injectable()

export class AppAuth implements CanActivate { 
  constructor(private AuthService: AuthService, private router: Router) { }
 
  canActivate(_route: ActivatedRouteSnapshot): boolean {
    if(!this.AuthService.loggedUserStatusSub.getValue()) {
      this.router.navigateByUrl('/login');
    }

    return this.AuthService.loggedUserStatusSub.getValue();
  } 
}

const routes: Routes = [
  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    component: LoginComponent,
    children: []
  },
  {
    path: 'register',
    component: RegisterComponent,
    children: []
  },
  {
    path: 'forgotpwd',
    component: ForgotpwdComponent,
    children: []
  },
  {
    path: 'home',
    component: HomeComponent,
    children: [{
      path: 'mobiles',
      component: ApplistComponent
    },
    {
      path: 'kids',
      component: ApplistComponent
    }],
    canActivate: [AppAuth]
  },
  {
    path: 'mycart',
    component: HomeComponent,
    children: [],
    canActivate: [AppAuth]
  },
  {
    path: 'profile',
    component: HomeComponent,
    children: [],
    canActivate: [AppAuth]
  },
  {
    path: 'logout',
    component: LogoutComponent,
    children: []
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AppAuth]
})

export class AppRoutingModule {
  constructor(
     private router: Router, 
     private route: ActivatedRoute,
     private AuthService: AuthService
  ) {
    if(this.AuthService.loggedUserStatusSub.getValue() && this.route.routeConfig == null) {
      this.router.navigateByUrl('/home');
    }
    
    this.router.events
      .filter(e => e instanceof RouterEvent)
      .subscribe(e => {
          if (e instanceof NavigationStart) {
            console.log('loading')
              //AppComponent.spinner = true;
          } else if (e instanceof NavigationEnd) {
            console.log('done')
              //AppComponent.spinner = false;
          }
      });
  }
}