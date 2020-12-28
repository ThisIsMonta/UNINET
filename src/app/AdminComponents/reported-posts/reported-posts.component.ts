import { Component, OnInit } from '@angular/core';
import { AdminService } from 'src/app/Services/admin.service';
import { UserService } from 'src/app/Services/user.service';

declare var UIkit:any;

@Component({
  selector: 'app-reported-posts',
  templateUrl: './reported-posts.component.html',
  styleUrls: ['./reported-posts.component.css']
})
export class ReportedPostsComponent implements OnInit {

  reportedPosts:any = [];
  loading:boolean = true;
  constructor(public userService:UserService,private adminService:AdminService) { }

  ngOnInit(): void {
    this.getReportedPost();
  }

  getReportedPost(){
    this.adminService.getReportedPosts().subscribe((res:any)=>{
      this.reportedPosts = res.feed.posts;
    },()=>{},()=>{
      this.loading = false;
    })
  }

  removePost(id){
    this.userService.deletePost(id).subscribe((res)=>{
      console.log(res);
    },()=>{},()=>{
      UIkit.notification({message:'Post has been removed',status:'warning',timeout:'500'})
      this.getReportedPost();
    })
  }

  ignorePost(id){
    this.adminService.ignoreReportedPost(id).subscribe((res:any)=>{
      console.log(res);
      this.reportedPosts = res.posts;
    },()=>{},()=>{
      UIkit.notification({message:'Ignored',status:'danger',timeout:'500'})
    })
  }

}
