import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

// import custom validator to validate that password and confirm password fields match
import { MustMatch } from '../../helpers/must-match.validator';

import {AuthenticationService} from '../../authentication.service';
import {Student} from '../../student';
import {GlobalVariable} from '../../globals'

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  registerForm: FormGroup;
    submitted = false;

  constructor(private formBuilder: FormBuilder, private authenticationService: AuthenticationService) { }

  ngOnInit() {
    let numberRegEx = /^[0][1-9]\d{9}$|^[1-9]\d{9}$/;
    let emailRegEx = /^.+@[^\.].*\.[a-z]{2,}$/;
    this.registerForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      address: ['', Validators.required],
      city: ['', Validators.required],
      program: ['', Validators.required],
      phoneNumber: ['', [Validators.required, Validators.pattern(numberRegEx)]],
      studentNumber: ['', [Validators.required, Validators.minLength(9), Validators.maxLength(9)]],
      email: ['', [Validators.required, Validators.pattern(emailRegEx)]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required]
    }, {
        validator: MustMatch('password', 'confirmPassword')
      });

      console.log(JSON.stringify(GlobalVariable.student));
  }

  // convenience getter for easy access to form fields
  get f() { return this.registerForm.controls; }

  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.registerForm.invalid) {
      return;
    }

    let newStudent: Student = {
      firstName: this.registerForm.value.firstName,
      lastName: this.registerForm.value.lastName,
      address: this.registerForm.value.address,
      city: this.registerForm.value.city,
      email: this.registerForm.value.email,
      studentNumber: this.registerForm.value.studentNumber,
      phoneNumber: this.registerForm.value.phoneNumber,
      program: this.registerForm.value.program,
      password: this.registerForm.value.password
    }
    
    this.authenticationService.signup(newStudent).subscribe(item => {
      //GlobalVariable.student = item;
      console.log(JSON.stringify(item));
      alert("Successfully Registerd ! \nTry signing in...");
    });
  }
}