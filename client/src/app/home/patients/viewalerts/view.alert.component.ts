import { Component, OnInit, Input } from '@angular/core';
import { User } from 'src/app/user';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { DataService } from 'src/app/data.service';
import { Log, Alert } from 'src/app/data';
import { AuthenticationService } from 'src/app/authentication.service';


@Component({
  selector: 'app-view-alert',
  templateUrl: './view.alert.component.html'
})
export class AlertsComponent implements OnInit {

    @Input() alert: Alert;

    constructor(private formBuilder: FormBuilder, 
      private router: Router, 
      private authService: AuthenticationService,
      private dataService: DataService) {  

      }
      
      ngOnInit() {
        
      } 
}
  