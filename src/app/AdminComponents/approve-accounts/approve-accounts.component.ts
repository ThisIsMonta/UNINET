import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AdminService } from 'src/app/Services/admin.service';
import { HttpService } from 'src/app/Services/http.service';
declare var UIkit:any;

@Component({
  selector: 'app-approve-accounts',
  templateUrl: './approve-accounts.component.html',
  styleUrls: ['./approve-accounts.component.css']
})
export class ApproveAccountsComponent implements OnInit {

  pendingUsers: any = [];
  classes: any = [];
  loading:boolean = true;
  approveForm: FormGroup;
  constructor(private fb: FormBuilder,private http:HttpService, private adminService: AdminService) { }

  ngOnInit(): void {
    this.approveForm = this.fb.group({
      role: ['', [
        Validators.required,
        
      ]
      ],
      class: ['', [
        Validators.required
      ]
      ]
    })
    this.gettingPendingUsers();
    this.adminService.classes().subscribe((classes) => {
      this.classes = classes;
    },()=>{},()=>{
      this.loading = false;
    });
  }

  isStudent(value){
    if(value=="Teacher"){
      this.approveForm.get('class').disable();
    }
  }

  approveUser(id) {
    this.approveForm.markAllAsTouched();
    if(this.approveForm.invalid){
      UIkit.notification({message: "Verify your form please.",status:'danger'});
    }else{
      this.http.sendPostRequest(`/user/${id}/activate`,this.approveForm.value).subscribe((res)=>{
      },(e)=>{
        UIkit.notification({message: e.message,status:'danger'});
      },()=>{
        this.approveForm.reset();
        this.gettingPendingUsers();
      })
    }
  }

  rejectUser(id){
    this.adminService.removeUser(id).subscribe((res)=>{
      this.gettingPendingUsers();
    },(e)=>{
      UIkit.notification({message: e.message,status:'danger'});
    },()=>{
      UIkit.notification({message: `User rejected`,status:'danger'});
    })
  }


  gettingPendingUsers() {
    this.adminService.getPendingUsers().subscribe((users) => {
      this.pendingUsers = users;
    });
  }

  get role(){
    return this.approveForm.get('role');
  }

  get class(){
    return this.approveForm.get('class');
  }

}
