import { Component, OnInit, Input } from '@angular/core';
import { User } from 'src/app/user';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { DataService } from 'src/app/data.service';


@Component({
  selector: 'app-info',
  templateUrl: './patient.info.component.html'
})
export class InfoPatientComponent implements OnInit {

    visible:boolean;
    @Input() patient: User;
    @Input() user: User;
  
    constructor(private formBuilder: FormBuilder, 
      private router: Router, 
      private dataService: DataService) {  
    }

    ngOnInit() {
    }  

    toggle() {
        this.visible = !this.visible;
    }
  }
  