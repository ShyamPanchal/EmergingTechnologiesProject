import { Component, OnInit, Input } from '@angular/core';
import { User } from 'src/app/user';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DataService } from 'src/app/data.service';
import { Alert } from 'src/app/data';


@Component({
  selector: 'app-send-alert',
  templateUrl: './send.alert.component.html'
})
export class SendAlertComponent implements OnInit {

    @Input() user: User;
    @Input() nurse: User;
  
    submitted: boolean = false;
    
    sendAlertForm: FormGroup;
    
    constructor(private formBuilder: FormBuilder, 
      private router: Router, 
      private dataService: DataService) {
        this.sendAlertForm = this.formBuilder.group({
          alert: ['', Validators.required]
        });
    }

  ngOnInit() {
  }

  get f() { return this.sendAlertForm.controls; }

  send() {    
    this.submitted = true;
    if (!this.sendAlertForm.invalid) {

        let alert: Alert = {
          alertString: this.sendAlertForm.value.alert,
          createdBy: this.user._id
        };

        this.dataService.sendAlert(alert).subscribe(item => {
          console.log(item);
        });
        this.sendAlertForm.reset();
        this.submitted = false;
      }      
    }
}
  