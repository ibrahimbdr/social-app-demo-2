import { Injectable } from '@angular/core';
import { Firestore, addDoc, collectionData, docData, collection, doc, deleteDoc, updateDoc, Timestamp, serverTimestamp  } from '@angular/fire/firestore';
// import { collection, doc } from '@firebase/firestore';
import { Observable } from 'rxjs';
import { PostObj } from '../models/post-obj';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private firestore: Firestore) { }

  createPost() {

  }

  getPosts(): Observable<PostObj[]> {
    const postsRef = collection(this.firestore, 'posts');
    return collectionData(postsRef, {idField: 'id'}) as Observable<PostObj[]>
  }

  getPostById(id: any): Observable<PostObj> {
    const postDocRef = doc(this.firestore, `posts/${id}`);
    return docData(postDocRef, {idField: 'id'}) as Observable<PostObj>
  }

  addPost(post: PostObj){
    const postsRef = collection(this.firestore, 'posts');
    return addDoc(postsRef, {...post, createdAt: new Date(), updatedAt: serverTimestamp()});
  }

  deletePost(id: any){
    const postDocRef = doc(this.firestore, `posts/${id}`);
    return deleteDoc(postDocRef);
  }

  updatePost(post: any, data: any) {
    const postDocRef = doc(this.firestore, `posts/${post.id}`);
    return updateDoc(postDocRef, {...data, updatedAt: serverTimestamp()});
  }

  getNotif(): Observable<[]> {
    const NotifRef = collection(this.firestore, 'notifications');
    return collectionData(NotifRef, {idField: 'id'}) as Observable<[]>
  }

  addNotif(notif: any){
    const NotifRef = collection(this.firestore, 'notifications');
    return addDoc(NotifRef, {...notif, createdAt: new Date()});
  }

  updateNotif(notif: any, data: any) {
    const NotifDocRef = doc(this.firestore, `notifications/${notif.id}`);
    return updateDoc(NotifDocRef, data);
  }

  deleteNotif(id: any){
    const NotifDocRef = doc(this.firestore, `notifications/${id}`);
    return deleteDoc(NotifDocRef);
  }

}
