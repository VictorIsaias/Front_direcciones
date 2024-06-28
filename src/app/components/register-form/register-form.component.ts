import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ReCaptchaV3Service } from 'ng-recaptcha';
import { ApiService } from 'src/app/services/api.service';


@Component({
  selector: 'app-register-form',
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.scss']
  
})


export class RegisterFormComponent {
  form:FormGroup
  hide = true;

  constructor(private recaptchaV3Service: ReCaptchaV3Service,fb:FormBuilder,private auth:ApiService,private router: Router){
    this.form=fb.group({
      name:['', [Validators.required, Validators.minLength(2)]],
      lastname:['', [Validators.required, Validators.minLength(2)]],
      birthdate:['', [Validators.required]],
      nickname:['', [Validators.required]],
      phone:['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    })  
  }
  
  
  submit(){
    this.auth.post(this.form.getRawValue(),"register").subscribe(response => {
      if(response){
        this.executeImportantAction()

      }
    })
    
  }

  
  redirect(){
    this.router.navigate(['/login']);
  }

   executeImportantAction() {
    this.recaptchaV3Service.execute('importantAction')
      .subscribe((token) => this.redirect());
  }
}
