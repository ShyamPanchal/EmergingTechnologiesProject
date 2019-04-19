import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { User } from 'src/app/user';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { DataService } from 'src/app/data.service';
import { Logs } from 'selenium-webdriver';
import { Log, Tip } from 'src/app/data';


@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html'
})
export class ViewCommentComponent implements OnInit {

    @Input() comment: Tip;
    @Output() callback: EventEmitter<Tip> = new EventEmitter<Tip>();

    visible:boolean;

    toggle() {
      this.visible = !this.visible;
    }

    constructor(private formBuilder: FormBuilder, 
      private router: Router, 
      private dataService: DataService) {

  
    }
  
    ngOnInit() {

    }  

    dismiss() {
        this.dataService.dismissComment(this.comment._id).subscribe(
            res=>{
              console.log("Log dismissed");
              this.callback.emit(this.comment);
            }
          );
    }

  }
  