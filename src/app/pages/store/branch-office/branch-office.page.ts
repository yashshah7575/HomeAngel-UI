import { Component, OnInit } from '@angular/core';
import leaflet, { Map, tileLayer, marke } from 'leaflet';

@Component({
  selector: 'app-branch-office',
  templateUrl: './branch-office.page.html',
  styleUrls: ['./branch-office.page.scss'],
})
export class BranchOfficePage implements OnInit {


  directions:Array<any> = [
    {
      title: 'Surat',
      address: 'B/6 Utsav',
      commune: 'Surat',
      longitude: 72.796060,
      latitude: 21.189860
    }
  ]

  direction:any = {}

  constructor() { }

  ngOnInit() {
  }

  map: Map;
  marke: marke;

  ionViewDidEnter() { this.leafletMap(); }

  leafletMap() {
    this.map = new Map('mapId', {
      renderer: leaflet.canvas()
    })
    tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: 'edupala.com © ionic LeafLet'
    }).addTo(this.map);
    this.map.locate({
      setView: true,
      maxZoom: 18,
      zoomControl: true,
    })
    
    setTimeout(() => {
      this.marke = leaflet.marker([this.directions[0].latitude, this.directions[0].longitude]).on('click', () => {
      })
      this.updateDirection(this.directions[0])
      this.map.dragging.enable();
      this.map.touchZoom.enable();
      this.map.doubleClickZoom.enable();
      this.map.scrollWheelZoom.enable();
      this.map.boxZoom.enable();
      this.map.keyboard.enable();
    },1000)
  }

  updateDirection(direction) {
    let latlng = {lat:direction.latitude,lng:direction.longitude};
    let markerGroup = leaflet.featureGroup();
    markerGroup.addLayer(this.marke);
    this.map.addLayer(markerGroup)
    this.marke.setLatLng(latlng)
    .bindPopup(`${direction.address}, ${direction.commune}`)
    .openPopup();
    this.map.setView(latlng, 18);
  }

  changeDirection(){
    this.updateDirection(this.direction)
  }

}
