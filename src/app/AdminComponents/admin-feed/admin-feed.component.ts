import { Component, OnInit } from '@angular/core';
import { AdminService } from 'src/app/Services/admin.service';

@Component({
  selector: 'app-admin-feed',
  templateUrl: './admin-feed.component.html',
  styleUrls: ['./admin-feed.component.css']
})
export class AdminFeedComponent implements OnInit {

  user:any;
  adminPosts:any=[];
  constructor(private adminService:AdminService) { }

  ngOnInit(): void {
    this.user = JSON.parse(sessionStorage.getItem('user'));
    this.adminService.getAdminPosts().subscribe((res:any)=>{
      this.adminPosts = res.feed.posts;      
    })
  }

}
