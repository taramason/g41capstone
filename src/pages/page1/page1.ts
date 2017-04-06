import { Component, OnInit, ViewChild } from '@angular/core';

import { NavController } from 'ionic-angular';
import {MediaCapture, Camera} from 'ionic-native';
import { Platform } from 'ionic-angular';



@Component({
  selector: 'page-page1',
  templateUrl: 'page1.html',

})

export class Page1 implements OnInit {

  @ViewChild('myvideo') myVideo: any;
    //myVideo == #my-video

  peer;
  anotherid;
  mypeerid;

  constructor() {
  }

  ngOnInit() {
    let video = this.myVideo.nativeElement;

    this.peer = new Peer({key: 'nek1yj0qrb43g14i'});
    setTimeout(() => {
      this.mypeerid = this.peer.id;
    },3000);

    this.peer.on('connection', function(conn) {
      conn.on('data', function(data){
      // Will print 'hi!'
      console.log(data);
      });
    });

 var n = <any>navigator;

    n.getUserMedia =  ( n.getUserMedia || n.webkitGetUserMedia || n.mozGetUserMedia || n.msGetUserMedia );

    this.peer.on('call', function(call) {

      n.getUserMedia({video: true, audio: true}, function(stream) {
        call.answer(stream);
        call.on('stream', function(remotestream){
          video.src = URL.createObjectURL(remotestream);
          video.play();
        })
      }, function(err) {
        console.log('Failed to get stream', err);
      })
    })
  }

  connect(){
    var conn = this.peer.connect(this.anotherid);
    conn.on('open', function(){
      conn.send('Message from that id');
    });
  }

  videoconnect(){
    let video = this.myVideo.nativeElement;
    var options = {
      sourceType: 1
    };

    var localvar = this.peer;
    var fname = this.anotherid;

    //var getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia;

    var n = <any>navigator;

    n.getUserMedia = ( n.getUserMedia || n.webkitGetUserMedia || n.mozGetUserMedia  || n.msGetUserMedia );

    n.getUserMedia({video: true, audio: true}, function(stream) {
      var call = localvar.call(fname, stream);
      call.on('stream', function(remotestream) {
        video.src = URL.createObjectURL(remotestream);
        video.play();
      })
    }, function(err){
      console.log('Failed to get stream', err);
    })

  }
}
