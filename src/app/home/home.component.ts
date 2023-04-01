import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { PostObj } from 'src/app/models/post-obj';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  postsArr: PostObj[] = [];
  constructor() {
    this.postsArr = [
      {id:'1', post: "Here's a small text description for the card content. Nothing more, nothing less."},
      {id:'2', post: "Here's a small text description for the card content. Nothing more, nothing less."},
      {id:'3', post: "Here's a small text description for the card content. Nothing more, nothing less."},
      {id:'4', post: "Here's a small text description for the card content. Nothing more, nothing less."},
      {id:'5', post: "Here's a small text description for the card content. Nothing more, nothing less."},
    ]

  }

  ngOnInit(): void {
  }

  likePost(id: any){

  }

  commentPost(id: any){

  }

  editPost(id: any){

  }


}
