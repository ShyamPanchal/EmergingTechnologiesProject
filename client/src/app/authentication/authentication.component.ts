import { Component, OnInit } from '@angular/core';
import { GlobalVariable } from '../globals';
import { Router } from "@angular/router";

@Component({
  selector: 'app-authentication',
  templateUrl: './authentication.component.html',
  styleUrls: ['./authentication.component.css']
})
export class AuthenticationComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
    //GlobalVariable.student._id = "5c96d327088222566858c52d";
    if (GlobalVariable.student._id) {
      console.log("Student found with id: " + GlobalVariable.student._id);
      this.router.navigate(['/home']);
    }
  }

}
