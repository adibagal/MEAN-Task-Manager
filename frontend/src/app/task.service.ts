import { Injectable } from '@angular/core';
import { Task } from './Models/task.model';
import { WebRequestService } from './web-request.service';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  constructor(private webReqService: WebRequestService) { }
  
  getList(){
    return this.webReqService.get(`lists`)
  }
  createList(title:string){

    return this.webReqService.post('lists',{title});
  }
  
  
  getTasks(listId:string){    
    return this.webReqService.get(`lists/$(listId)/tasks`);
  }
  createTask(title:string,listId:string){
    return this.webReqService.post(`lists`,{title});
  }
  complete(task:Task){
    return this.webReqService.patch(`lists/${task._listId}/tasks/${task._id}`,{
      completed: !task.completed
    });
  }

}
