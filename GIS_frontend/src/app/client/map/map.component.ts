import 'ol/ol.css';
import { Map, View } from 'ol';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';
import GeoJSON from 'ol/format/GeoJSON';
import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
import { Fill, Stroke, Style, Text } from 'ol/style';
import { Component, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import {MatDialog} from '@angular/material/dialog';
import { TableComponent } from '../table/table.component';
import { DbserviceService } from 'src/app/services/dbservice.service';
@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit {
currowner;
ngmeasure;
map;
openstate=false
  coodinateResults:[];
  panelOpenState = false;
  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );
  constructor(private breakpointObserver: BreakpointObserver,
     public dialog: MatDialog,
      private dbservice: DbserviceService) { 
    dbservice.showStartUpHtml=true;
  }

  

      openTable(){
        let self = this
        const dialogRef = this.dialog.open(TableComponent, {
          width: '70%',
          height:'60%'
        });
        dialogRef.afterClosed().subscribe(result => {
          this.coodinateResults = result.data;
          // this.queryPlot(result.data)

          var pixel = this.map.getPixelFromCoordinate(this.coodinateResults);
          this.map.forEachFeatureAtPixel(pixel, function (f, a) {
            
            
            self.selected = f;
            console.log(self.selected);
            self.selected.setStyle(self.highlightStyle);
             self.zoomValue = 18.5;
       
             self.view.animate({
               center:self.coodinateResults,
               duration: 500,
               zoom: self.view.getZoom() + 1
           });
          });
      
        });
      }



      highlightStyle = new Style({
        fill: new Fill({
          color: '#d60d0d',
        }),
        stroke: new Stroke({
          color: '#d60d0d',
          width: 3,
        }),
      });
  
      selected = null;
      focused = false;
      editing = false;
  
  
        map_color = new Style({
          stroke: new Stroke({
            color: "#0a0c0f",
            // width: 1.5
          })
        })
  
        mySource = new VectorSource({
          url: 'assets/map.json',
          // url: 'assets/c25Geo.json',
          format: new GeoJSON(),
        })
        vector = new VectorLayer({
          source: this.mySource,
          // style: map_color
        });
  
        raster = new TileLayer({
          source: new OSM(),
        });
  
  
        place = [0.0147, 5.7299];
        zoomValue = 15.3;
        view = new View({
          projection: 'EPSG:4326',
          center: this.place,
          zoom: this.zoomValue,
          minZoom: 9,
          maxZoom: 18,
        });

  ngOnInit(): void {
let self = this;
    
      
      this.map = new Map({
        target: 'map',
        layers: [
          this.raster, this.vector
        ],
        view: this.view
      });


      this.map.on('click', (e) => {
        if (this.selected !== null || this.editing===true) {
          if (this.focused===false) {
            this.selected.setStyle(undefined);
            this.openstate = false
          this.selected = null;
          this.view.animate({
            center: [0.0149, 5.7249],
            duration: 200,
            zoom: 15.3
        }); 
      }
        this.focused = false;
        }
      this.map.forEachFeatureAtPixel(e.pixel, function (feature, layer) {
        // console.log(layer);
        
      document.getElementById('Propid').innerHTML = feature.get('Prop_ID')||"none";
      document.getElementById('landuse').innerHTML = feature.get('LandUse')||"none";
      document.getElementById('locality').innerHTML = feature.get('Locality')||"none";
      document.getElementById('plotno').innerHTML = feature.get('Plot_No')||"none";
      document.getElementById('size').innerHTML = feature.get('Acre').toFixed(2)||"none";
      document.getElementById('leasein').innerHTML = feature.get('lease_star')||"none";
      document.getElementById('leaseout').innerHTML = feature.get('lease_end')||"none";
      document.getElementById('litigation').innerHTML = feature.get('litigation')||"none";
      document.getElementById('mortgage').innerHTML = feature.get('mortgate_v')||"none";
      document.getElementById('currowner').innerHTML = feature.get('owner_curr')||"none";
    
      self.openstate=true;
        console.log();
        self.place = e.coordinate;
        self.zoomValue = 18.5;
        console.log(self.place);
        self.view.animate({
          center: self.place,
          duration: 500,
          zoom: self.view.getZoom() + 1
      }); 
      self.selected=feature;
      if (self.selected == null) {
        self.selected.setStyle(undefined);
        self.selected = null;
      }
      else{
        self.selected.setStyle(self.highlightStyle)
      }
    
    })
  
        
    })  
  }
}
