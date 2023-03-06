import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CrudService } from 'src/app/services/crud.service';
import { DbserviceService } from 'src/app/services/dbservice.service';
import { register } from 'src/app/services/interfaces';

interface reg{
  fullname,
  username,
  password
}
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  details:reg={
    fullname:'',
    username:'',
    password:''
  }
  constructor(private router:Router,private crudservice:CrudService,private formBuilder: FormBuilder, private service: DbserviceService) {
    this.service.showStartUpHtml=true; }
    

  signup(){
    console.log(this.details);
    this.crudservice.registerUser(this.details).subscribe(response=>{
      console.log(response);
      if (response === "1sucessful") {
        this.router.navigate(['login'])
      } else {
      }
    })
}

login(){
  this.router.navigate(['login'])
}
  ngOnInit(): void {
    
  }
}
