import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-task-tracker',
  templateUrl: './task-tracker.component.html',
  styleUrls: ['./task-tracker.component.css']
})
export class TaskTrackerComponent implements OnInit {
  tasks=[{id:'', name:'', task:'', deadLine:''}]
  constructor() { }

  ngOnInit(): void {
  }

  createTask(todoForm:NgForm){
    let task = todoForm.value;
    let obj = {id:task.id, name:task.name, task:task.task, deadLine:task.deadLine}

    this.tasks.push(obj);
  }


}
