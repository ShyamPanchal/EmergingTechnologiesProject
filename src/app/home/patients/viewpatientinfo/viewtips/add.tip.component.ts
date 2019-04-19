import { Component, OnInit, Input } from '@angular/core';
import { User } from 'src/app/user';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DataService } from 'src/app/data.service';
import { Logs } from 'selenium-webdriver';
import { Log, Tip } from 'src/app/data';


@Component({
  selector: 'app-add-tip',
  templateUrl: './add.tip.component.html'
})
export class AddTipComponent implements OnInit {

    @Input() user: User;
    @Input() patient: User;
  
    submitted: boolean = false;
    
    addTipForm: FormGroup;
    
    constructor(private formBuilder: FormBuilder, 
      private router: Router, 
      private dataService: DataService) {
        this.addTipForm = this.formBuilder.group({
          tip: ['', Validators.required]
        });
    }

  ngOnInit() {
  }

  get f() { return this.addTipForm.controls; }

  addLog() {    
    this.submitted = true;
    if (!this.addTipForm.invalid) {

        let comment: Tip = {
          dailyTips: this.addTipForm.value.tip,
          createdBy: this.user._id,
          createdFor: this.patient._id
        };

        this.dataService.addTip(comment).subscribe(item => {
          console.log(item);
        });
        this.addTipForm.reset();
        this.submitted = false;
      }      
    }
}
  