import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MaphomeComponent } from './maphome/maphome.component';
import { UiComponent } from './ui/ui.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DbtableComponent } from './dbtable/dbtable.component';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatSelectModule} from '@angular/material/select';
import { PostformComponent } from './postform/postform.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { UinavComponent } from './uinav/uinav.component';
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatDialogModule} from '@angular/material/dialog';
import {MatCardModule} from '@angular/material/card';
import { MapComponent } from './client/map/map.component';
import { DbserviceService } from './services/dbservice.service';
import { CrudService } from './services/crud.service';
import { TableComponent } from './client/table/table.component';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatNativeDateModule} from '@angular/material/core';
import {MatMenuModule} from '@angular/material/menu';
import { RegisterComponent } from './Auth/register/register.component';
import { LoginComponent } from './Auth/login/login.component';
import { NavbarComponent } from './Auth/navbar/navbar.component';
import { TestComponent } from './testfolder/test/test.component';
import { DialogComponent } from './testfolder/dialog/dialog.component';
import { UpdateComponent } from './update/update.component';
import { AuthMapComponent } from './client/auth-map/auth-map.component';
import { AuthpageComponent } from './Auth/authpage/authpage.component';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';

@NgModule({
  declarations: [
    AppComponent,
    MaphomeComponent,
    UiComponent,
    DbtableComponent,
    PostformComponent,
    UinavComponent,
    MapComponent,
    AuthMapComponent,
    TableComponent,
    RegisterComponent,
    LoginComponent,
    NavbarComponent,
    TestComponent,
    DialogComponent,
    UpdateComponent,
    AuthpageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatIconModule,
    MatButtonModule,
    MatSelectModule,
    ReactiveFormsModule,
    LayoutModule,
    MatToolbarModule,
    MatSidenavModule,
    MatListModule,
    MatExpansionModule,
    MatDialogModule,
    MatCardModule,
    HttpClientModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatMenuModule,
    MatSnackBarModule,
    MatProgressSpinnerModule
  ],
  providers: [DbserviceService, CrudService],
  bootstrap: [AppComponent],
  entryComponents:[
    MaphomeComponent,
     TableComponent,
     LoginComponent,
     DialogComponent,
     UpdateComponent
    ]
})
export class AppModule { }
