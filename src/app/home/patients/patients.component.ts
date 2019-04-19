import { Component, OnInit, Input } from '@angular/core';
import { User } from 'src/app/user';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { DataService } from 'src/app/data.service';


@Component({
  selector: 'app-patients',
  templateUrl: './patients.component.html'
})
export class PatientsComponent implements OnInit {

    patientList: User[] = [];
    patientVisible:boolean;
    @Input() user: User;
    selectedPatient: User;
  
    constructor(private formBuilder: FormBuilder, 
      private router: Router, 
      private dataService: DataService) {

  
    }
  
    getPatients() {
  
      this.dataService.getPatients().subscribe(patients => {
        this.patientList = patients;
      });
    }
  
    ngOnInit() {
      if (this.user.isNurse) {
        this.getPatients();
      }
    }  

    togglePatient(patient:User) {
        this.patientVisible = !this.patientVisible;
        this.selectedPatient = patient;
    }
  }
  