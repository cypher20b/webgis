import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { DbserviceService } from './services/dbservice.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'webgis';
  
  constructor(private router: Router, public dbservice: DbserviceService){
    dbservice.showStartUpHtml = false
  }
  
  openAdmin(){
    this.router.navigate(['/login'])
  }

  openClient(){
    this.router.navigate(['/authenticatedclient'])
  }
}
