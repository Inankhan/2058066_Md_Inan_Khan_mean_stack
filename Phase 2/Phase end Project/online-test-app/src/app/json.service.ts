import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';
import { Questions} from './question.model';

@Injectable({
  providedIn: 'root'
})
export class JsonService {

  constructor(public http:HttpClient) { }

  retrieveJsonQuestions():Observable<Questions[]>{
    return this.http.get<Questions[]>("/assets/questions.json");
  }
}
