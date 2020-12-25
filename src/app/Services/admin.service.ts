import { Injectable } from '@angular/core';
import { HttpService } from './http.service';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private http:HttpService) { }

  classes(){
    return this.http.sendGetRequest("/rang");
  }

  getClass(id){
    return this.http.sendGetRequest(`rang/${id}`);
  }

  groups(){
    return this.http.sendGetRequest("/group");
  }

  getGroup(id){
    return this.http.sendGetRequest(`/group/${id}`);
  }

  getPendingUsers(){
    return this.http.sendGetRequest("/user/pending");
  }

  getAdminPosts(){
    return this.http.sendGetRequest("/timeline/administration");
  }

  post(data){
    return this.http.sendPostRequest("/post/admin",data);
  }

  removeUser(id){
    return this.http.sendDeleteRequest(`/user/${id}`);
  }
}
