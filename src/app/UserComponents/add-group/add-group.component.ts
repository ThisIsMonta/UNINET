import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AdminService } from 'src/app/Services/admin.service';
import { HttpService } from 'src/app/Services/http.service';
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
  constructor(private fb:FormBuilder,private adminService:AdminService,private http:HttpService) { }

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
    this.newGroupForm.valueChanges.subscribe(console.log)
  }

  addGroup(){
    this.newGroupForm.markAllAsTouched();
    if(this.newGroupForm.invalid){
      console.log("invalid");
    }else{
      var classname = this.newGroupForm.get('name').value;
      this.http.sendPostRequest("/group",this.newGroupForm.value).subscribe((r)=>{
        console.log(r);
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
      this.classesList = classes.populated;
      console.log(this.classesList);
    });
  }

  getGroups(){
    this.adminService.groups().subscribe((groups:any)=>{
      this.groupList = groups.populated;
      console.log(this.groupList);
    });
  }

  deleteGroup(id,groupname){
    this.http.sendDeleteRequest(`/group/${id}`).subscribe((r)=>{
      console.log(r);
      UIkit.notification({message: `Group ${groupname} has been deleted`});
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
