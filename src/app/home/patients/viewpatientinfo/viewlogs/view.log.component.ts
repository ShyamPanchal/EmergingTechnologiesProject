import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { User } from 'src/app/user';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { DataService } from 'src/app/data.service';
import { Logs } from 'selenium-webdriver';
import { Log } from 'src/app/data';


@Component({
  selector: 'app-view-log',
  templateUrl: './view.log.component.html'
})
export class ViewLogComponent implements OnInit {

    @Input() log: Log;
    @Output() callback : EventEmitter<Log> =  new EventEmitter<Log>();

    logVisible:boolean;

    toggleLog() {
      this.logVisible = !this.logVisible;
    }

    constructor(private formBuilder: FormBuilder, 
      private router: Router, 
      private dataService: DataService) {

  
    }
  
    ngOnInit() {

    }  

    dismiss() {
      this.dataService.dismissLog(this.log._id).subscribe(
        res=>{
          console.log("Log dismissed");
          this.callback.emit(this.log);
        }
      );
    }

  }
  