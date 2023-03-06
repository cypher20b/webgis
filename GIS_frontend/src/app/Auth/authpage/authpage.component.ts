import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CrudService } from 'src/app/services/crud.service';
import { DbserviceService } from 'src/app/services/dbservice.service';
import { RouteGuardService } from 'src/app/services/route-guard.service';
interface user{
  username,
  password
}
@Component({
  selector: 'app-authpage',
  templateUrl: './authpage.component.html',
  styleUrls: ['./authpage.component.scss']
})
export class AuthpageComponent implements OnInit {

  constructor(private routeg:RouteGuardService,private router:Router ,private dbservice:DbserviceService, private crudservice:CrudService) { this.dbservice.showStartUpHtml=true }
details:user={
  username:"",
  password:""
};
waitforserver:boolean=false;
login(){
console.log(this.details);
document.querySelector('.spinnerclass').classList.remove('d-none')
this.waitforserver=true
this.crudservice.UserLogin(this.details).subscribe(response=>{
  console.log(response);
  if (response === true) {
    this.routeg.routevar=true
    console.log("before navigation");
    document.querySelector('spinnerclass').classList.add('d-none')
    this.router.navigate(['nav'])
    this.waitforserver=false
  } else {
    this.waitforserver=false
    this.routeg.routevar=false
    document.querySelector(".loginform").classList.add('animate__animated','animate__shakeX')
    this.details.username=""
    this.details.password=""
    document.querySelector(".loginform").addEventListener('animationend', () => {
    document.querySelector(".loginform").classList.remove('animate__animated','animate__shakeX')
    document.querySelector('.spinnerclass').classList.add('d-none')
    });
  }
})
}

signup(){
this.router.navigate(['register'])
}
  ngOnInit(): void {
  }

}
