import { Component, OnInit, Input } from '@angular/core';
import { User } from 'src/app/user';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { DataService } from 'src/app/data.service';
import { MatTabChangeEvent } from '@angular/material';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html'
})
export class DashboardComponent implements OnInit {


    @Input() user: User;
    @Input() nurse: User;
  
    constructor(private formBuilder: FormBuilder, 
      private router: Router, 
      private dataService: DataService) {
    }
  
    
  
    ngOnInit() {
    }  

    onLinkClick(event: MatTabChangeEvent) {

    }
  }
  