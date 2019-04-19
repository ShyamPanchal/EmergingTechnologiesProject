import { Component, Input, OnInit } from '@angular/core';
import { VideoUrl } from 'src/app/data';

@Component({
  selector: 'app-play-video',
  templateUrl: './play.video.component.html'
})
export class PlayVideoComponent  implements OnInit {
  id = '';
  playerVars = {
    cc_lang_pref: 'en'
  };

  @Input() video: VideoUrl;
  private player;
  private ytEvent;

  constructor() {
  
  }
  ngOnInit() {
      this.id = this.video.url;
  }
  onStateChange(event) {
    this.ytEvent = event.data;
  }
  savePlayer(player) {
    this.player = player;
  }
  
  playVideo() {
    this.player.playVideo();
  }
  
  pauseVideo() {
    this.player.pauseVideo();
  }
}
