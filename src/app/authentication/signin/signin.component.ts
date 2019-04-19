import { Component, OnInit } from '@angular/core';
import {AuthenticationService} from '../../authentication.service';
import {User} from '../../user';
import { GlobalVariable } from '../../globals';
import { Router } from "@angular/router";
import { formArrayNameProvider } from '@angular/forms/src/directives/reactive_directives/form_group_name';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {

  constructor(private router: Router, private authenticationService: AuthenticationService) { }

  loginUser(form){
    let credentials:any = {};
    credentials.username = form.value.email;
    credentials.password = form.value.password;

    console.log(credentials);

    this.authenticationService.signin(credentials).subscribe(user => {
      GlobalVariable.user = user;
      console.log(JSON.stringify(user));
      this.router.navigate(['/home']);
      alert("Successfully Signed In!");
    }, err => {
      console.log(err);
      alert("Login Failed.\nInvalid Email or Password");
    });

  }

  ngOnInit() {
  }

}
