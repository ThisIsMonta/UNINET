import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AdminService } from 'src/app/Services/admin.service';
import { HttpService } from 'src/app/Services/http.service';

@Component({
  selector: 'app-add-class',
  templateUrl: './add-class.component.html',
  styleUrls: ['./add-class.component.css']
})
export class AddClassComponent implements OnInit {
  
  newClassForm:FormGroup
  classesList:any = [];
  constructor(private fb:FormBuilder,private adminService:AdminService,private http:HttpService) { }

  ngOnInit(): void {
    this.getClasses();
    this.newClassForm = this.fb.group({
      department:['',
        [Validators.required]
      ],
      name:['',
        [Validators.required]
      ]
    });
    this.newClassForm.valueChanges.subscribe(console.log)
  }

  addClass(){
    this.newClassForm.markAllAsTouched();
    if(this.newClassForm.invalid){
      console.log("unvalid");
    }else{
      var classname = this.newClassForm.get('name').value;
      this.http.sendPostRequest("/rang",this.newClassForm.value).subscribe((r)=>{
        console.log(r);
        this.getClasses();
        // UIkit.notification({message: `Class ${classname} has been created`});
      })
      this.newClassForm.reset();
    }
  }

  getClasses(){
    this.adminService.classes().subscribe((classes:any)=>{
      this.classesList = classes;
      console.log(this.classesList);
    });
  }

  deleteClass(id,classname){
    this.http.sendDeleteRequest(`/rang/${id}`).subscribe((r)=>{
      console.log(r);
      // UIkit.notification({message: `Class ${classname} has been deleted`});
      this.getClasses();
    })
  }
  

  get department(){
    return this.newClassForm.get('department');
  }

  get name(){
    return this.newClassForm.get('name');
  }

}
