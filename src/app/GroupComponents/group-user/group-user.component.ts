import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'group-user',
  templateUrl: './group-user.component.html',
  styleUrls: ['./group-user.component.css']
})
export class GroupUserComponent implements OnInit {

  @Input('user') user:any

  constructor() { }

  ngOnInit(): void {
  }

}
