import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-portfolio-app',
  templateUrl: './portfolio-app.component.html',
  styleUrls: ['./portfolio-app.component.css']
})
export class PortfolioAppComponent implements OnInit {
  reg:boolean = true;
  log:boolean = false;
  profile:boolean = false;
  table:boolean = false;

  user:string = '';
  pass:string = '';
  registrationConformation:string = '';
  loginMsg:string = '';

  contacts=[{name:'', number:''}];


  constructor() { }

  ngOnInit(): void {
  }

  fromReg(){
    this.reg = false;
    this.log = true;
  }

  fromLog(){
    this.reg = true;
    this.log = false;
  }

  createProfile(regRef:NgForm){
    let newUser = regRef.value;
    this.user = newUser.user;
    this.pass = newUser.pass;
    this.registrationConformation = 'New user successfully registered! Now please login.'

    regRef.reset();
  }

  checkUser(loginRef:NgForm){
    let login = loginRef.value;
    if(login.user == this.user && login.pass == this.pass){
      this.loadProfile();
    }
    else{
      this.loginMsg = 'Incorrect username and/or password. Please enter the correct information'
    }
  }

  loadProfile(){
    this.log = false;
    this.profile = true;
  }

  createContact(contactRef:NgForm){
    let contact = contactRef.value;
    let obj = {name:contact.name, number:contact.number}

    this.contacts.push(obj);
  }

  showTable(){
    this.table=!this.table;
  }

}
