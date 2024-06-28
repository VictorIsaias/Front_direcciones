import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss']
})
export class LoginFormComponent {
  form:FormGroup
  hide = true;

  constructor(fb:FormBuilder,private auth:ApiService,
    private router: Router,private cookieService: CookieService){
    this.form=fb.group({
      input: ['', [Validators.required]],
      password: ['', [Validators.required]]
    })  
  }
  
  submit(){
    this.auth.post(this.form.getRawValue(),"login").subscribe(response => {
      if(response){
        this.cookieService.set('token', response.token.token);
        this.redirectDashboard()

      }
    });
  }
  redirect(){
    this.router.navigate(['/register']);
  }
  
  redirectDashboard(){
    this.router.navigate(['/dashboard']);
  }
}
