import { Component, OnInit } from '@angular/core';
import {TaskService} from 'src/app/task.service';
import { Router } from '@angular/router';
import { List } from 'src/app/Models/list.model';

@Component({
  selector: 'app-new-list',
  templateUrl: './new-list.component.html',
  styleUrls: ['./new-list.component.scss']
})
export class NewListComponent implements OnInit {

  constructor(private taskService:TaskService,private router:Router) { }

  ngOnInit() {
  }
  createList(title:string){
     this.taskService.createList(title).subscribe((list:List)=>{
      console.log(list);
      this.router.navigate(['/lists',list._id]);
    });
  }
}