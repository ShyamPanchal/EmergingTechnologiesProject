import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
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
    @Output() callback: EventEmitter<Alert> = new EventEmitter<Alert>();

    constructor(private formBuilder: FormBuilder, 
      private router: Router, 
      private authService: AuthenticationService,
      private dataService: DataService) {  

      }
      
      ngOnInit() {
        
      } 

      dismiss():void {
        this.dataService.dismissAlert(this.alert._id).subscribe(
          res=>{
            console.log("Alert dismissed");
            this.callback.emit(this.alert);
          }
        );
      }
}
  