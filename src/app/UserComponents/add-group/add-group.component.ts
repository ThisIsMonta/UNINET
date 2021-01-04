import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AdminService } from 'src/app/Services/admin.service';
import { HttpService } from 'src/app/Services/http.service';
import { UserService } from 'src/app/Services/user.service';
declare var UIkit:any;

@Component({
  selector: 'app-add-group',
  templateUrl: './add-group.component.html',
  styleUrls: ['./add-group.component.css']
})
export class AddGroupComponent implements OnInit {

  newGroupForm:FormGroup
  classesList:any = [];
  groupList:any = [];
  loading:boolean = true;
  constructor(private fb:FormBuilder,private adminService:AdminService,private userService:UserService,private http:HttpService) { }

  ngOnInit(): void {
    this.getClasses();
    this.getGroups();
    this.newGroupForm = this.fb.group({
      name:['',
        [Validators.required]
      ],
      classId:['',
        [Validators.required]
      ]
    });
  }

  addGroup(){
    this.newGroupForm.markAllAsTouched();
    if(this.newGroupForm.invalid){
      UIkit.notification({message: `Form invalid`,status:'warning'});
    }else{
      var classname = this.newGroupForm.get('name').value;
      this.http.sendPostRequest("/group",this.newGroupForm.value).subscribe((r)=>{
      },()=>{},()=>{
        this.newGroupForm.reset();
        this.getClasses();
        this.getGroups();
        UIkit.notification({message: `Group ${classname} has been created`});
      })
    }
  }

  getClasses(){
    this.adminService.classes().subscribe((classes:any)=>{
      this.classesList = classes;
    });
  }

  getGroups(){
    
    this.adminService.groups().subscribe((groups:any)=>{
      this.groupList = groups.populated;
      this.userService.eventEmit.emit("GroupChange",this.groupList)
    },()=>{},()=>{
      this.loading = false;
    });
  }

  deleteGroup(id,groupname){
    this.http.sendDeleteRequest(`/group/${id}`).subscribe((r)=>{
      UIkit.notification({message: `Group ${groupname} has been deleted`,status:'success'});
      this.getClasses();
      this.getGroups();
    })
  }
  

  get name(){
    return this.newGroupForm.get('name');
  }

  get classId(){
    return this.newGroupForm.get('classId');
  }


}
