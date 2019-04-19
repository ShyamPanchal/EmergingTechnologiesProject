import { Component, OnInit, Input } from '@angular/core';
import { User } from 'src/app/user';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DataService } from 'src/app/data.service';
import { Alert, VideoUrl } from 'src/app/data';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-video',
  templateUrl: './video.component.html'
})
export class VideoComponent implements OnInit {

    @Input() user: User;
    videos: VideoUrl[];
    filteredVideos: Observable<VideoUrl[]>;

    constructor(private formBuilder: FormBuilder, 
      private router: Router, 
      private dataService: DataService) {  
    }

    ngOnInit() {
      this.dataService.getVideos().subscribe(
        videos => this.videos = videos);

      this.filteredVideos =  new Observable(
        function subscriber(observer) {
          //observer.next();
        });
    }  

    addVideo() {
      this.videos.push({ title:"", url:""} as VideoUrl);
    }

    update() {
      this.dataService.getVideos().subscribe(
        videos => this.videos = videos);
    }

    addedVideo(addedVideo: VideoUrl) {
      this.update();
    }

    removeVideo(canceledVideo: VideoUrl) {
      this.update();
      /*

      console.log("title: " + JSON.stringify(canceledVideo.title));
      if (!JSON.stringify(canceledVideo._id)) {
        console.log("new: ");
        this.filteredVideos = this.dataService.getVideos()
        this.videos.filter(video => video._id != JSON.stringify(canceledVideo._id)
          //{console.log(video._id + " :: " + canceledVideo._id);}
          );
        }
       */
    }
   
}
  