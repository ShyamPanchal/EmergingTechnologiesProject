import { Component, OnInit, Input } from '@angular/core';
import { User } from 'src/app/user';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DataService } from 'src/app/data.service';
import { Logs } from 'selenium-webdriver';
import { Log } from 'src/app/data';


@Component({
  selector: 'app-add-log',
  templateUrl: './add.log.component.html'
})
export class AddLogComponent implements OnInit {

    @Input() user: User;
    @Input() patient: User;
  
    submitted: boolean = false;
    
    addLogForm: FormGroup;
    
    constructor(private formBuilder: FormBuilder, 
      private router: Router, 
      private dataService: DataService) {
        this.addLogForm = this.formBuilder.group({
          bodyTemperature: ['', Validators.required],
          heartRate: ['', Validators.required],
          bloodPressureMin: ['', Validators.required],
          bloodPressureMax: ['', Validators.required],
          respiratoryRate: ['', Validators.required],
        });
    }

  ngOnInit() {
    console.log(this.user);
    console.log(this.patient);
  }

  get f() { return this.addLogForm.controls; }

  addLog() {    
    this.submitted = true;
    if (!this.addLogForm.invalid) {

        let newLog: Log = {
          bodyTemperature: this.addLogForm.value.bodyTemperature,
          heartRate: this.addLogForm.value.heartRate,
          bloodPressure: this.addLogForm.value.bloodPressureMax + " " + this.addLogForm.value.bloodPressureMin,
          respiratoryRate: this.addLogForm.value.respiratoryRate,
          createdBy: this.user._id,
          createdFor: this.patient._id
        };

        this.dataService.addLog(newLog).subscribe(item => {
          console.log(item);
        });
        this.addLogForm.reset();
        this.submitted = false;
      }      
    }
}
  