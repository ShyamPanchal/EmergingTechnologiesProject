import { Component, OnInit, Input } from '@angular/core';
import { User } from 'src/app/user';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DataService } from 'src/app/data.service';
import { VideoUrl } from 'src/app/data';


@Component({
  selector: 'app-info-video',
  templateUrl: './info.video.component.html'
})
export class InfoVideoComponent implements OnInit {

    visible:boolean;
    @Input() video: VideoUrl;
    @Input() user: User;

    toggle() {
        this.visible = !this.visible;
    }
    
    constructor(private formBuilder: FormBuilder, 
      private router: Router, 
      private dataService: DataService) {

    }

  ngOnInit() {
  }

}
  