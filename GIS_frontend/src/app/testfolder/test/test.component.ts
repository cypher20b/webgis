import { Component, OnInit, ViewChild } from '@angular/core';
import { DbserviceService } from 'src/app/services/dbservice.service';

import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from '../dialog/dialog.component';
import { Hero } from './hero';
import { CrudService } from 'src/app/services/crud.service';

interface postdatainterface{
  prop_id,
  locality,
  landuse,
  plot_no,
  shape_area,
  shape_leng,
  block_no_1,
  litigation,
  owner_curr,
  owner_past,
  lease_star,
  lease_end,
  mortgage_v,
  matgage_st
}

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styles: [
  ]
})
export class TestComponent implements OnInit {
postdata:postdatainterface={
  prop_id:'',
  locality:'',
  landuse:'',
  plot_no:'',
  shape_area:'',
  shape_leng:'',
  block_no_1:'',
  litigation:'',
  owner_curr:'',
  owner_past:'',
  lease_star:'',
  lease_end:'',
  mortgage_v:'',
  matgage_st:''
};
  litigations=['YES','NO']
  mortgage_vs=['YES','NO']
  landusage=['RESIDENTIAL','COMMERCIAL','INDUSTRIAL','SCHOOL','POLICE','BUFFER']
 
constructor(private dbservice:DbserviceService, private crudservice:CrudService){dbservice.showStartUpHtml=true;}


submitted = false;

onSubmit() { this.submitted = true;
  console.log(this.postdata);
  this.crudservice.saveItem(this.postdata).subscribe(resStatus => {
      console.log(resStatus);
    });
  
}

  ngOnInit(): void {
  }

}
