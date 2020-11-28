import { Component, OnInit } from '@angular/core';
import { ActivatedRoute,Params } from '@angular/router';
import { TaskService } from 'src/app/task.service';
import {Observable} from 'rxjs';
import {from} from 'rxjs';
import { map } from 'rxjs/operators';
import { Task } from 'src/app/Models/task.model';
import { List } from 'src/app/Models/list.model';


@Component({
  selector: 'app-task-view',
  templateUrl: './task-view.component.html',
  styleUrls: ['./task-view.component.scss']
})
export class TaskViewComponent implements OnInit {

  lists : List[];
  tasks : Task[];
  constructor(public taskService:TaskService,public route:ActivatedRoute) { }

  ngOnInit(){
    this.route.params.subscribe(
      (params:Params) => {
      
        this.taskService.getTasks(params.listId).subscribe((tasks:Task[]) =>{
          this.tasks= tasks;
        })
      }
     
    )

    this.taskService.getList().subscribe((lists:List[])=>{
      this.lists =lists;
    })
  }
  
  onTaskClick(task:Task){
    this.taskService.complete(task).subscribe(()=>{
      console.log("Completed Successfully");
      task.completed =!task.completed;
    })
  }
}
