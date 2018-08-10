import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router, Params } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent
{

  loginForm: FormGroup;
  errorMessage: string = '';

  constructor( //bring imports into constructor
    public authService: AuthService,
    private router: Router,
    private fb: FormBuilder
  )
  {
    this.createForm();
  }

  createForm()
  {
    this.loginForm = this.fb.group(
    {//initialize email & password to empty string
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
  }


  tryLogin(value)
  { //run login credentials through auth service
    this.authService.doLogin(value)
      .then(res =>
      {
        this.router.navigate(['/deck']);
      }, err =>
      {
        console.log(err);
        this.errorMessage = err.message;
      })
  }
}