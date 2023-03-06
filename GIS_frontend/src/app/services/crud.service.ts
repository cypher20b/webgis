import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

interface plotdetails{
  gid:string,
  prop_id,
  landuse:string,
  locality:string,
  plot_no,
  shape_area,
  block_no_1,
  owner_past,
  owner_curr,
  litigation,
  lease_star,
  lease_end,
  mortgage_v
}
@Injectable({
  providedIn: 'root'
})


export class CrudService {
updatedata:plotdetails={
  gid:'',
  prop_id:'',
  landuse:'',
  locality:'', 
  plot_no:'',
  shape_area:'',
  block_no_1:'',
  owner_past:'',
  owner_curr:'',
  litigation:'',
  lease_star:'',
  lease_end:'',
  mortgage_v:''
};
  constructor(private http : HttpClient) { }
  getAllItems() {
    const url = 'https://webgistest.herokuapp.com';
    // const url = 'assets/map.json';
    return this.http. get(url); 
  }

  getAll() {
    // const url = 'http://localhost:3001/features';
    const url = 'assets/map.json';
    return this.http. get(url); 
  }
  saveItem(data) {
    const url = 'https://webgistest.herokuapp.com';
    return this.http.post(url, data);
  }
  UserLogin(data) {
    const url = 'https://webgistest.herokuapp.com/authusers';
    return this.http.post(url, data);
  }
  registerUser(data) {
    const url = 'https://webgistest.herokuapp.com/users';
    return this.http.post(url, data);
  }
  updateUser(item_no, data) {
    const url = 'https://webgistest.herokuapp.com/update/' + item_no;
    return this.http. put(url, data);
  }

  deleteUser(id) {
    const url = 'https://webgistest.herokuapp.com/delete/' + id;
    return this.http. delete(url);
  }
}
