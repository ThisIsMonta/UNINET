import { Component, OnInit } from '@angular/core';
import { AdminService } from 'src/app/Services/admin.service';
import { HttpService } from 'src/app/Services/http.service';

@Component({
  selector: 'app-delete-accounts',
  templateUrl: './delete-accounts.component.html',
  styleUrls: ['./delete-accounts.component.css']
})
export class DeleteAccountsComponent implements OnInit {

  allUsers:any = [];
  loading:boolean = true;
  constructor(private http:HttpService,private adminService:AdminService) { }

  ngOnInit(): void {
    this.getAllUsers();
  }

  getAllUsers(){
    this.http.sendGetRequest("/user").subscribe((res)=>{
      this.allUsers = res;
    },()=>{},()=>{
      this.loading = false
    })
  }

  deleteUser(id){
    this.adminService.removeUser(id).subscribe((res)=>{
      this.getAllUsers();
    })
  }

}
