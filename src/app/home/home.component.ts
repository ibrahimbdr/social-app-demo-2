import { DataService } from './../services/data.service';
import { Component, OnInit } from '@angular/core';
import { AlertController, IonicModule } from '@ionic/angular';
import { DocumentData } from 'rxfire/firestore/interfaces';
import { PostObj } from 'src/app/models/post-obj';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  postContent!: string;
  postsArr: PostObj[] | DocumentData[] = [];
  count: number = 0;
  notifArr: [] = [];
  constructor(private dataService:DataService, private alertCtrl: AlertController) {
    this.dataService.getPosts().subscribe(data => {
      this.postsArr = data;
    })
    this.dataService.getNotif().subscribe(n => {
      this.notifArr = n;
      console.log(n);
      let tempArr = []
      this.notifArr.forEach(not => {
        if(not['active']){
          tempArr.push(not)
        }
      })
      this.count = tempArr.length
    })

  }

  ngOnInit(): void {
  }

  clearNotification(){
    this.notifArr.forEach(n => {
      if(n['active']){
        this.dataService.updateNotif(n, {active: false});
      }
    })
  }

  post() {
    this.dataService.addPost({post: this.postContent, notified: false, editable: false, liked: false, comments: []});
    this.postContent = ''
    this.dataService.addNotif({title:"New post added", active:true})
  }

  likePost(post: any){
    let isLiked = false;
    this.postsArr.forEach(p => {
      if(post.id === p['id']) {
        isLiked = p['liked']
      }
    });
    this.dataService.updatePost(post, {liked: !isLiked})
    isLiked?this.dataService.addNotif({title:"user disliked one post", active:true}):this.dataService.addNotif({title:"user liked one post", active:true})
  }

  commentPost(post: any, comment: any){
    let commentArr: string[] | undefined = [];

    this.postsArr.forEach(p => {
      if(post.id === p['id']) {
        commentArr = p['comments']
        commentArr?.push(comment)
      }
    });
    this.dataService.updatePost(post, {comments: commentArr})
    this.dataService.addNotif({title:"user commented on post", active:true})
  }

  async editPost(post: any){
    const alert = await this.alertCtrl.create({
      header: 'Edit Post',
      inputs: [
        {
          name: 'post',
          placeholder: 'write the replacement post here',
          type: 'textarea',
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel'
        },
        {
          text: 'Update',
          handler: (res) =>
          {
            this.dataService.updatePost(post, {post: res.post})
            this.dataService.getPosts().subscribe(data => this.postsArr = data)
          }
        },
        {
          text: 'Delete',
          handler: (res) =>
          {
            this.dataService.deletePost(post.id)
            this.dataService.getPosts().subscribe(data => this.postsArr = data)
          }
        }
      ]
    });
    await alert.present();
  }


}
