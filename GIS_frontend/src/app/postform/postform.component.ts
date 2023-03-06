import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { CrudService } from '../services/crud.service';
import { DbserviceService } from '../services/dbservice.service';

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
  selector: 'app-postform',
  templateUrl: './postform.component.html',
  styleUrls: ['./postform.component.scss']
})
export class PostformComponent implements OnInit {
  postdata:postdatainterface={
    prop_id:'',
    locality:'',
    landuse:'',
    plot_no:'',
    shape_area:'',
    shape_leng:'',
    block_no_1:'',
    litigation:'--Litigation--',
    owner_curr:'',
    owner_past:'',
    lease_star:'',
    lease_end:'',
    mortgage_v:'--Mortgage--',
    matgage_st:''
  };
    litigations=['YES','NO']
    mortgage_vs=['YES','NO']
    landusage=['RESIDENTIAL','COMMERCIAL','INDUSTRIAL','SCHOOL','POLICE','BUFFER']
  constructor(private crudservice: CrudService) { }


  // select id card
  animalControl = new FormControl('', Validators.required);
  selectFormControl = new FormControl('', Validators.required);
  
  submitted = false;

  postToDb(){
    this.submitted = true;
    if (this.postdata.mortgage_v==="--Mortgage--") {
      this.postdata.mortgage_v=""
    }
    if (this.postdata.litigation==="--litigation--") {
      this.postdata.litigation=""
    }
  console.log(this.postdata);
  this.crudservice.saveItem(this.postdata).subscribe(resStatus => {
      console.log(resStatus);
    });
    location.reload();
  }


  ngOnInit(): void {
  }

}
