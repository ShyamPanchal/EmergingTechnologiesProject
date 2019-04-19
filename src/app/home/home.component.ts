import { Component, OnInit } from '@angular/core';
import { GlobalVariable } from '../globals';
import { Router } from "@angular/router";
import { User } from '../user';
import { Course } from '../course';
import { CourseService } from '../course.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from '../authentication.service';
import { DataService } from '../data.service';
import { Tip, Alert } from '../data';
import { interval } from 'rxjs';
//import { userInfo } from 'os';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  user: User;
  nurse:User;

  alertList: Alert[] = [];
  commentList: Tip[] = [];
  
  constructor(private formBuilder: FormBuilder, 
    private router: Router, 
    private dataService:DataService,
    private authService: AuthenticationService) {

  }

  ngOnInit() {
    this.authService.currentUser.subscribe( user=> this.user = user);
    this.update ();
    
    const secondsCounter = interval(5000);
    secondsCounter.subscribe(n =>
    {
      this.update ();
    });
  
  }

  logout() {
    this.authService.signOut();
  }  

  update () {
    if (this.user.isNurse) {
      this.dataService.getAlerts().subscribe(alerts => {
        alerts.map(alert => {
          this.dataService.getFullName(alert.createdBy).subscribe(
            name => {
            alert.createdBy = name;
          });
        });
        this.alertList = alerts;
      });
    } else {
      this.nurse = this.user;
      this.dataService.getTips(this.user._id).subscribe(tips => {
        tips.map(tip => {
          this.dataService.getFullName(tip.createdBy).subscribe(
            name => {
            tip.createdBy = name;
          });
        });
        this.commentList = tips;
      });
    }
  }
}
