import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { DbserviceService } from 'src/app/services/dbservice.service';
import { LoginComponent } from '../login/login.component';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  LOGIN;
  REGISTER;
    constructor(public dialog: MatDialog, public service: DbserviceService) {this.LOGIN = this.service.register_status; }
    openDialog() {
      const config = new MatDialogConfig();
      config.disableClose = false;
      config.hasBackdrop = true;
      config.maxWidth = '100vw';
      config.position = {top: '55px', left: '75%'};
      this.dialog.open(LoginComponent, config);
    }
  ngOnInit(): void {
  }

}
