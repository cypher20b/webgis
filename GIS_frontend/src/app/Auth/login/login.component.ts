import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { CrudService } from 'src/app/services/crud.service';
import { DbserviceService } from 'src/app/services/dbservice.service';
import { login } from 'src/app/services/interfaces';
import { NavbarComponent } from '../navbar/navbar.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  details:login={ username: '', password: ''};
  stat:boolean;
  constructor(private route: Router, public service: DbserviceService,private crudService:CrudService,  public dialogRef: MatDialogRef<NavbarComponent>) { 
    if (localStorage.getItem('username')=="emma") {
      this.stat=true;
  
}else{
 this.stat=false;

  }
}

login(){
  // this.service.showStartUpHtml=false;
  // localStorage.setItem('username', this.details.username)
  // console.log(this.details)
  // this.service.register_status=false;
  // this.route.navigate(['admin']);
  // this.dialogRef.close();
  this.crudService.getAll().subscribe((users) => {
    console.log(users);
    
  })

}

logout(){
  localStorage.clear();
  this.service.isLoggingOut = true;
  this.route.navigate(['']);
  this.dialogRef.close();
}
  ngOnInit(): void {
  }

}
