import { AfterViewInit, Component, Inject, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import {MatSnackBar} from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { CrudService } from '../services/crud.service';
import { UpdateComponent } from '../update/update.component';

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
  selector: 'app-dbtable',
  templateUrl: './dbtable.component.html',
  styleUrls: ['./dbtable.component.scss']
})
export class DbtableComponent implements AfterViewInit {
  yesdelete: string;
  nocancel: string;
  listArray:tbData[] = []; 
  tableDataSource:[]=[];
  tableCoordinateSource:[]=[];
  finale:[]=[];
  result1:[]=[];
  coordinatesResults=[]
  displayedColumns: string[] = ['gid', 'prop_id',  'landuse', 'locality', 'shape_area', 'owner_curr', 'litigation', 'lease_star', 'lease_end', 'mortgage_v','edit'];
  // displayedColumns: string[] = ['OBJECTID', 'Prop_ID',  'LandUse', 'Locality', 'Shape_area', 'owner_curr', 'litigation', 'lease_star', 'lease_end', 'mortgage_v','coordinates'];
  // dataSource= new MatTableDataSource<tbData>(this.listArray);
  value = '';
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  dataSource: MatTableDataSource<tbData>;

  constructor(private crudService:CrudService, public dialog: MatDialog,) { 
    this.crudService.getAllItems().subscribe(users => {
      this.listArray= users as any;
      this.dataSource = new MatTableDataSource<tbData>(this.listArray);
      this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
      console.log(this.listArray);
    });
  }
  clearSearchBar() {
    this.value = '';
    this.ngAfterViewInit();
  }

  editData(row){
    console.log(row);
    this.crudService.updatedata = row;
    
    const dialogRef = this.dialog.open(UpdateComponent, {
      width: '70%',
      height:'50%'
    });
  }
  ngAfterViewInit() {
    this.crudService.getAllItems().subscribe(users => {
      this.listArray= users as any;
      this.dataSource = new MatTableDataSource<tbData>(this.listArray);
      this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
      console.log(this.listArray);
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  loadUsers() {
    this.crudService.getAllItems().subscribe(users => {
      this.listArray= users as any;
      this.dataSource = new MatTableDataSource<tbData>(this.listArray);
      this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
      console.log(this.listArray);
    });
  }

  // deleteUser(id) {
  //   this.crudService.deleteUser(id).subscribe(response=>{
  //     console.log(response);
  //   })
  //   this.loadUsers();
  //   // console.log(id);
  //   location.reload();
  // }

  openDialog(row): void {
    console.log(row);
    this.crudService.updatedata = row;
    const dialogRef = this.dialog.open(ConfirmDelete, {
      width: '250px',
    });


    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      // this.nocancel = result;
    });
  }
}
@Component({
  selector: 'confirm-delete',
  templateUrl: 'confirm-delete.html',
})
export class ConfirmDelete {

  constructor( public crudservice:CrudService,private snackBar: MatSnackBar,
    public dialogRef: MatDialogRef<ConfirmDelete>,
    @Inject(MAT_DIALOG_DATA) public data) {}

  deleteUser(id) {
    this.crudservice.deleteUser(id).subscribe(response=>{
      console.log(response);
    })
    this.snackBar.open(`${this.crudservice.updatedata.owner_curr} has been deleted sucessfully`)
    // this.loadUsers();
    // console.log(id);
    location.reload();
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}


