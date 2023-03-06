import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { AfterViewInit, Component, ViewChild,  OnInit, Optional, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { CrudService } from 'src/app/services/crud.service';
import { DbserviceService } from 'src/app/services/dbservice.service';

export interface tbData {
  gid:string;
  prop_id: string;
  landuse:string; 
  locality:string; 
  plot_no:string;
  shape_area:string; 
  block_no_1:string; 
  owner_past:string;
  owner_curr:string;
  litigation:string;
  lease_star:string;
  lease_end:string;
  mortgage_v:string;
  coodinates:[];
}
@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements AfterViewInit, OnInit {
  listArray:tbData[] = [];
  exampleArray=[];
  tableDataSource:[]=[];
  tableCoordinateSource:[]=[];
  finale:[]=[];
  result1:[]=[];
  coordinatesResults=[];
  selectedValue;
  // displayedColumns: string[] = ['gid', 'prop_id',  'landuse', 'locality', 'plot_no', 'shape_area', 'block_no_1', 'owner_past', 'owner_curr', 'litigation', 'lease_star', 'lease_end', 'mortgage_v'];
  displayedColumns: string[] = ['OBJECTID', 'Prop_ID',  'LandUse', 'Locality', 'Shape_area', 'owner_curr', 'litigation', 'lease_star', 'lease_end', 'mortgage_v','coordinates'];
  dataSource= new MatTableDataSource<tbData>(this.listArray);
  value = '';
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private crudService : CrudService,
     private dbservice: DbserviceService,
     public dialogRef:MatDialogRef<TableComponent>,
     @Optional() @Inject(MAT_DIALOG_DATA) public data:any
     ) {
    // Assign the data to the data source for the table to render
    this.dataSource = new MatTableDataSource<tbData>(this.listArray);
    this.loadUsers()
  }
  closeDialog() {
    this.dialogRef.close({ event: 'close', data: this.coordinatesResults });
  }
clearSearchBar(){
  this.value = '';
    // Assign the data to the data source for the table to render
    this.dataSource = new MatTableDataSource<tbData>(this.listArray);
    this.loadUsers()
    this.ngAfterViewInit();
}
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
// search filters
applyFilter(event:Event){
switch (this.selectedValue) {
  case "FilterByLanduse":
    this.FilterByLanduse(event);
    break;
  case "FilterByOwner":
  this.FilterByOwner(event)
    break;
  case "FilterByPropId":
  this.FilterByPropId(event)
    break;
}
}
  FilterByOwner(event: Event) {
    this.dataSource.filterPredicate = (d: tbData, filter: string) => {
      // console.log(d[3])
      // console.log(d[column])
      const textToSearch = d['owner_curr'] && d['owner_curr'].toLowerCase() || '';
      // console.log(textToSearch.indexOf(filter));
      return textToSearch.indexOf(filter) !== -1;
    };
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
   
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  FilterByPropId(event: Event) {
    this.dataSource.filterPredicate = (d: tbData, filter: string) => {
      // console.log(d[3])
      // console.log(d[column])
      const textToSearch = d['prop_id'] && d['prop_id'].toLowerCase() || '';
      // console.log(textToSearch.indexOf(filter));
      return textToSearch.indexOf(filter) !== -1;
    };
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
   
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  FilterByLanduse(event: Event) {
    this.dataSource.filterPredicate = (d: tbData, filter: string) => {
      // console.log(d[3])
      // console.log(d[column])
      const textToSearch = d['landuse'] && d['landuse'].toLowerCase() || '';
      // console.log(textToSearch.indexOf(filter));
      return textToSearch.indexOf(filter) !== -1;
    };
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
   
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  
  loadUsers() {
    this.result1=[]
    this.crudService.getAll().subscribe((users:cord) => { 
      var results = users.features;
      this.tableDataSource = results.map(function (el) { return el.properties; });
      this.tableCoordinateSource = results.map(function (el) { return el.geometry; });
      // console.log(this.tableDataSource.length);
      // console.log(this.tableCoordinateSource);
      this.tableDataSource = results.map(function (el) { return el.properties; });
      // console.log(this.tableDataSource);
      for (let x = 0; x < this.tableDataSource.length; x++) {
        this.result1.push(Object.assign(this.tableDataSource[x],this.tableCoordinateSource[x]))
        
          this.dataSource = new MatTableDataSource<tbData>(this.tableDataSource);
          this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
     
      }
      console.log(this.result1);
      
    }); 
  }
  loadAll() {
    // this.crudService.getAllItems().subscribe(users => {
    //   this.listArray= users as any;
    //   this.dataSource = new MatTableDataSource<tbData>(this.listArray);
    //   this.dataSource.paginator = this.paginator;
    // this.dataSource.sort = this.sort;
    //   console.log(this.listArray);
    // });    
  }
  rowclick(row){
    this.coordinatesResults=[]
    let fullCoordinate1 = row[0][0][0];
    let fullCoordinate2 = row[0][3][1];
    this.coordinatesResults.push(fullCoordinate1-0.000121);
    this.coordinatesResults.push(fullCoordinate2-0.0002227);
    console.log(row);
    // console.log(fullCoordinate1);
    // console.log(fullCoordinate2);
    console.log(this.coordinatesResults);
    this.dbservice.rowclicked=true;
    this.closeDialog();
  }
ngOnInit(){
 
}
}

export interface cord{
  id: string;
  type: string;
  features
}