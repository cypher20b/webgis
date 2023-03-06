import { Component, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CrudService } from '../services/crud.service';
import { DbserviceService } from '../services/dbservice.service';
@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.scss']
})
export class UpdateComponent implements OnInit {

  constructor(private dbservice: DbserviceService, public crudservice: CrudService,
    public dialogRef:MatDialogRef<UpdateComponent>,) { dbservice.showStartUpHtml=true;}

    updateInfo(){
      console.log(this.crudservice.updatedata);
      this.crudservice.updateUser(this.crudservice.updatedata.gid, this.crudservice.updatedata).subscribe(response=>{
        console.log(response);
        
      })
    }
  ngOnInit(): void {
  }

}
