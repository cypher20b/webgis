import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav'

@Injectable({
  providedIn: 'root'
})
export class DbserviceService {
  sidenav: MatSidenav;
  isLoggingOut:boolean=false;
login_status=localStorage.getItem('username');
register_status=true;
dialog_status:number = 0
  showStartUpHtml:boolean;
  initial=[];
  // map;
  // selected = null;
  // focused = false;
  // editing = false;
  rowclicked = false;
  longlat;
  
}
