import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { JsonService } from '../json.service';
import { FormBuilder, FormGroup } from '@angular/forms';


@Component({
  selector: 'app-mc-questions',
  templateUrl: './mc-questions.component.html',
  styleUrls: ['./mc-questions.component.css']
})
export class McQuestionsComponent implements OnInit {
  questions:any;
  counter=0;
  correctAnswers=["HTML", "CSS", "<a>","Bootstrap", "A large amount of text", 
  "It logs input/data in the user console", "It is a Web Framework",
  "Sphere", "625", "10"]
  msg = ''
  form:boolean = false;
  result:boolean = false;

  constructor(public service:JsonService) { }

  ngOnInit(): void {
  }

  startTest(){
    this.service.retrieveJsonQuestions().subscribe(res=>{
      this.questions = res;
      
    })

    this.form = true;

  }

  checkAnswers(examRef:NgForm){
    let answers = examRef.value;
    let i = 0;
    this.counter = 0;
    for( let answer in answers){
      if (answers[answer] == this.correctAnswers[i]){
        this.counter++;
      }
      i++;
    }

    this.msg = (this.counter>5) ? 'Congrats, you have passed!' : 'Oh no, you have failed the exam :('
    this.result = true;

    setTimeout(() => window.scrollTo(0,2000), 100);
  }

}
