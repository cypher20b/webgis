import { Component } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import {MatDialog} from '@angular/material/dialog';
import { MaphomeComponent } from '../maphome/maphome.component';
import { DbserviceService } from '../services/dbservice.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-uinav',
  templateUrl: './uinav.component.html',
  styleUrls: ['./uinav.component.scss']
})
export class UinavComponent {
  panelOpenState = false; 
  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  constructor(private router:Router,
    private breakpointObserver: BreakpointObserver,
     public dialog: MatDialog,
     private dbservice: DbserviceService) {
    dbservice.showStartUpHtml=true;
  }
  logout(){
    this.dbservice.showStartUpHtml=false;
    this.router.navigate([''])
  }
openMap(){
  this.dialog.open(MaphomeComponent, {
    width: '500px',
    height:'500px'
  });
  // const dialogRef = this.dialog.open(MaphomeComponent);
  // dialogRef.afterClosed().subscribe(result => {
  //   console.log(`Dialog result: ${result}`);
  // });
}
}
