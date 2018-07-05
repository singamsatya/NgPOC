import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule , ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HttpHeaders  } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { MycartComponent } from './mycart/mycart.component';
import { ProfileComponent } from './profile/profile.component';
import { LogoutComponent } from './logout/logout.component';
import { RegisterComponent } from './register/register.component';
import { ForgotpwdComponent } from './forgotpwd/forgotpwd.component';

import { AuthService } from './services/auth.service';
import { HeaderService } from './services/header.service';
import { LoginService } from './services/login.service';
import { ApplistComponent } from './applist/applist.component';

const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    LoginComponent,
    LogoutComponent,
    MycartComponent,
    ProfileComponent,
    RegisterComponent,
    ForgotpwdComponent,
    ApplistComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppRoutingModule,
    NgbModule.forRoot()
  ],
  providers: [
  	AuthService,
    HeaderService,
    LoginService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
