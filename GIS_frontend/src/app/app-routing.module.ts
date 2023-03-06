import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthpageComponent } from './Auth/authpage/authpage.component';
import { RegisterComponent } from './Auth/register/register.component';
import { AuthMapComponent } from './client/auth-map/auth-map.component';
import { MapComponent } from './client/map/map.component';
import { MaphomeComponent } from './maphome/maphome.component';
import { RouteGuardService } from './services/route-guard.service';
import { TestComponent } from './testfolder/test/test.component';
import { UinavComponent } from './uinav/uinav.component';

const routes: Routes = [
{path:'',
  children:[
  {path:'register', component: RegisterComponent},
  {path:'login', component: AuthpageComponent},
  {path:'home', component: MaphomeComponent},
  {path:'nav', component: UinavComponent, canActivate:[RouteGuardService]},
  {path:'authenticatedclient', component: MapComponent},
  {path:'client', component: AuthMapComponent},
  {path:'test', component: TestComponent},
]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
