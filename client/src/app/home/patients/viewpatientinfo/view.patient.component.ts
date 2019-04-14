import { Component, OnInit, Input } from '@angular/core';
import { User } from 'src/app/user';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { DataService } from 'src/app/data.service';
import { Log, Alert } from 'src/app/data';
import { MatTabChangeEvent } from '@angular/material';


@Component({
  selector: 'app-view-patient',
  templateUrl: './view.patient.component.html'
})
export class ViewPatientComponent implements OnInit {

    @Input() user: User;
    @Input() patient: User;
    logList: Log[] = [];
  
    constructor(private formBuilder: FormBuilder, 
      private router: Router, 
      private dataService: DataService) {

  
    }
  
    ngOnInit() {
      this.update();
    }    
    
    update() {
      console.log("log update...  ");
      this.dataService.getLogs(this.patient._id).subscribe(logs => {
        this.logList = logs;
        console.log("log list: ");
        console.log(this.logList);
      });
    }
    
    onLinkClick(event: MatTabChangeEvent) {
      this.update();
    }

  }
  