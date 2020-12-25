import { Injectable } from '@angular/core';
import { HttpService } from './http.service';
import * as io from 'socket.io-client';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  public socket: any;

  constructor(private http:HttpService) {}

  initSocket(){
    this.socket = io.connect('http://a29b436625fa.ngrok.io',{query:{token:localStorage.getItem('token')}});
  }

  editProfile(data){
    return this.http.sendPutRequest(`/user`,data);
  }

  upvote(postID){
    return this.http.sendPostRequest(`/post/${postID}/upvote`,{});
  }

  downvote(postID){
    return this.http.sendPostRequest(`/post/${postID}/downvote`,{});
  }

  getPost(id){
    return this.http.sendGetRequest(`/post/${id}`);
  }

  getTimeline(){
    return this.http.sendGetRequest(`/timeline/general`);
  }

  getProfile(id){
    return this.http.sendGetRequest(`/user/${id}/informations`);
  }

  getSavedPosts(){
    return this.http.sendGetRequest(`/save`);
  }

  removeSavedPost(id){
    return this.http.sendDeleteRequest(`/save/${id}`);
  }

  post(data){
    return this.http.sendPostRequest(`/post/general`,data);
  }

  postInGroup(id,data){
    return this.http.sendPostRequest(`group/${id}/post`,data);
  }

  deletePost(id){
    return this.http.sendDeleteRequest(`/post/${id}`);
  }

  save(id){
    return this.http.sendPostRequest(`/save/${id}`,{});
  }

  report(){
    console.log("post reported");
  }

  comment(id,data){
    return this.http.sendPostRequest(`/post/${id}/comment`,data);
  }

  deleteComment(id){
    return this.http.sendDeleteRequest(`/post/comment/${id}`);
  }

  isMine(id){
    return id==JSON.parse(sessionStorage.getItem('user'))._id;
  }
}
