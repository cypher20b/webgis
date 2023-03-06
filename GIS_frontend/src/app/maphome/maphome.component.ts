import { Component, OnInit } from '@angular/core';
import Map from 'ol/Map';
import View from 'ol/View';
import VectorLayer from 'ol/layer/Vector';
import Style from 'ol/style/Style';
import Icon from 'ol/style/Icon';
import OSM from 'ol/source/OSM';
import * as olProj from 'ol/proj';
import TileLayer from 'ol/layer/Tile';

@Component({
  selector: 'app-maphome',
  templateUrl: './maphome.component.html',
  styleUrls: ['./maphome.component.scss']
})
export class MaphomeComponent implements OnInit {
 map;
  constructor() { }

  ngOnInit(): void {
    this.map = new Map({
      target: 'tema_map',
      layers: [
        new TileLayer({
          source: new OSM()
        })
      ],
      view: new View({
        center: [0.0149, 5.7249],
        zoom: 5
      })
    });
  }

}
