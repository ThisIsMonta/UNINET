import { Component, OnInit } from '@angular/core';
// import { Socket } from 'ngx-socket-io';
import { map } from 'rxjs/operators';
import { AdminService } from 'src/app/Services/admin.service';
import { AuthService } from 'src/app/Services/auth.service';
import { UserService } from 'src/app/Services/user.service';

declare var UIkit:any;

@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.css']
})
export class FeedComponent implements OnInit {

  user:any;
  notification:any;
  public data: any;

  groupList:any = [];

  constructor(private adminService:AdminService,public userService:UserService,public authService:AuthService) {
  }

 

  ngOnInit(): void {
    this.user = JSON.parse(sessionStorage.getItem('user'));
    this.notification = this.user.notification;
    console.log(this.notification);
    // this.userService.initSocket();
    this.userService.eventEmit.on("GroupChange",(groups:any)=>{
      this.groupList = groups;
    })
    this.connect();
    this.getGroups();
  }

  getGroups(){
    if(this.user.role=="Teacher"){
      this.adminService.groups().subscribe((res:any)=>{
        // console.log(res);
        this.groupList = res.populated;
        sessionStorage.setItem('groups',JSON.stringify(res.raw));
        // console.log(this.groupList);
      })
    }else{
      var classId = JSON.parse(sessionStorage.getItem('user')).class._id;
      this.adminService.getClass(classId).subscribe((res:any)=>{
        this.groupList = res.populated.groups;
        sessionStorage.setItem('groups',JSON.stringify(res.raw.groups));
        console.log(res);
        // console.log(this.groupList);
      });
    }
  }

  connect(){
    console.log("trying to connect");
    this.userService.socket.on('connect', () => {
      this.GetNotifications();
      this.NotificationAlert();
      this.readNotifications();
      this.notificationOpened();
    });
  }

  GetNotifications(){
    this.userService.socket.on('GetNotifications', event => {
      this.notification = event;
    });
  }

  NotificationAlert(){
    this.userService.socket.on('NotificationAlert', event => {
      console.log("NotificationAlert");
      this.notification.unread = 1;
      this.notification.events.push(event);
      console.log(event); 
    });
  }

  readNotifications(){
    console.log("clicking");
    this.userService.socket.emit("openNotification")
  }

  notificationOpened(){
    this.notification.unread = 0;
    this.userService.socket.on("notificationOpened",()=>{
      this.notification.unread = 0;
    })
  }

  disconnect(){
    this.userService.socket.on("disconnect",()=>{
      console.log("disconnected");
    })
  }

}
