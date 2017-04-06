import { Component, ViewChild } from '@angular/core';

import { NavController, NavParams } from 'ionic-angular';
import { MediaCapture, Camera } from 'ionic-native';


@Component({
  selector: 'page-page2',
  templateUrl: 'page2.html'
})

export class Page2 {
@ViewChild('myvideo') myVideo: any;

constructor(public navCtrl: NavController) {

}

startrecording() {
  MediaCapture.captureVideo((videodata) => {
    alert(JSON.stringify(videodata));
   })
}

selectvideo() {
  let video = this.myVideo.nativeElement;
  var options = {
    sourceType: 2,
    mediaType: 1
  };

  Camera.getPicture(options).then((data) => {
    video.src = data;
    video.play();
  })
}
}
