import { Component, OnInit, Input } from '@angular/core';
import { User } from 'src/app/user';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DataService } from 'src/app/data.service';
import { Alert, VideoUrl } from 'src/app/data';


@Component({
  selector: 'app-videos',
  templateUrl: './videos.component.html'
})
export class VideosComponent implements OnInit {

    @Input() user: User;
    videos: VideoUrl[];

    constructor(private formBuilder: FormBuilder, 
      private router: Router, 
      private dataService: DataService) {  
    }

    ngOnInit() {
      this.dataService.getVideos().subscribe(
        videos => this.videos = videos);
    }    
}
  