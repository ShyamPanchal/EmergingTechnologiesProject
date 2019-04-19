import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { User } from 'src/app/user';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DataService } from 'src/app/data.service';
import { VideoUrl } from 'src/app/data';
import { map } from 'rxjs-compat/operator/map';


@Component({
  selector: 'app-video-info',
  templateUrl: './video.info.component.html'
})
export class VideoInfoComponent implements OnInit {

    visible:boolean;
    @Input() video: VideoUrl;
    @Input() user: User;
    @Input() newVideo:boolean;
    @Output() canceled: EventEmitter<VideoUrl> = new EventEmitter<VideoUrl>();
    @Output() added: EventEmitter<VideoUrl> = new EventEmitter<VideoUrl>();
    @Output() callback: EventEmitter<VideoUrl> = new EventEmitter<VideoUrl>();

    toggle() {
        this.visible = !this.visible;
    }
    submitted: boolean = false;
    
    saveVideoForm: FormGroup;
    
    constructor(private formBuilder: FormBuilder, 
      private router: Router, 
      private dataService: DataService) {

    }

  ngOnInit() {
    if (!this.video._id) {
      this.toggle();
    }
    this.saveVideoForm = this.formBuilder.group({
      url: [this.video.url, Validators.required],
      title: [this.video.title, Validators.required]
    });

    this.saveVideoForm.controls.title.valueChanges
    .subscribe(value => this.video.title = value); 
  }

  get f() { return this.saveVideoForm.controls; }

  cancel() {
    this.canceled.emit(this.video);
    //this.saveVideoForm.reset();
    this.toggle();
  }
  
  dismiss() {
    this.dataService.deleteVideo(this.video._id).subscribe(
      res=>{
        console.log("Video Deleted");
        this.callback.emit(this.video);
      }
    );
  }
  
  saveVideo() {    
    this.submitted = true;
    if (!this.saveVideoForm.invalid) {

        let video: VideoUrl = {          
          url: this.saveVideoForm.value.url,
          title: this.saveVideoForm.value.title,
          createdBy: this.user._id
        };

        if (this.video._id) {       
          video._id= this.video._id;
          this.dataService.updateVideo(video).subscribe(item => {
            console.log(item);
            this.toggle();
          });
        } else {
            this.dataService.addVideo(video).subscribe(item => {
              console.log(item);
              this.toggle();
            });
        }
        //this.saveVideoForm.reset();
        this.added.emit(this.video);
        this.submitted = false;
      }      
    }
  }
  