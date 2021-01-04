import { Component, OnInit } from '@angular/core';
import { AdminService } from 'src/app/Services/admin.service';
import { AuthService } from 'src/app/Services/auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  groupList:any=[];

  constructor(public authService:AuthService,public adminService:AdminService) { }

  ngOnInit(): void {
    this.adminService.allGroups().subscribe((res)=>{
      this.groupList = res;
    })
  }

}
