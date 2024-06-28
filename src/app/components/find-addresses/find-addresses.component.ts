import { Component,OnInit, ViewChild ,ViewChildren,QueryList} from '@angular/core';
import { MapInfoWindow, MapMarker } from '@angular/google-maps';
import { CookieService } from 'ngx-cookie-service';
import { ApiService } from 'src/app/services/api.service';
interface address{
  latitude:number,
  longitude:number,
  street: string,
  suburb: string,
  city: string,
  state: string,
  country: string,
  zip_code: string,
}

@Component({
  selector: 'app-find-addresses',
  templateUrl: './find-addresses.component.html',
  styleUrls: ['./find-addresses.component.scss']
})
export class FindAddressesComponent implements OnInit{
  center: google.maps.LatLngLiteral = {lat: 19.477862, lng: -99.1038131}
  zoom = 5
  markerOptions: google.maps.MarkerOptions = {draggable: true}
  cookieValue:String

  markerPositions: { 
    position: google.maps.LatLngLiteral, 
    address: address 
  }[] = []

  @ViewChild(MapInfoWindow, { static: false }) infoWindow: MapInfoWindow | null = null
  @ViewChildren(MapMarker) markers: QueryList<MapMarker> | undefined 
  infoContent = ''
  selectedMarker: MapMarker | undefined;

  constructor(private cookieService: CookieService,private apiService:ApiService) {
    this.cookieValue = this.cookieService.get('token')

  }
  ngOnInit() {
    this.apiService.get("find-addresses",this.cookieValue).subscribe(response => {
      if(response){
        const addresses: Array<address> = response.addreses

        addresses.forEach(address => {
          if(typeof(address.latitude)=="string"&&typeof(address.longitude)=="string"){

            const markerPosition = {
              position:{
                lat: parseFloat(address.latitude),
                lng: parseFloat(address.longitude)
              },
              address:{
                latitude:parseFloat(address.latitude),
                longitude:parseFloat(address.longitude),
                street: address.street,
                suburb: address.suburb,
                city: address.city,
                state: address.state,
                country: address.country,
                zip_code: address.zip_code,
              }
            }
            this.markerPositions.push(markerPosition);
          }
        })
        
      }

    })
  }
  openInfoWindow(index: number) {
    if (!this.markers || !this.infoWindow) {
      return;
    }
    const markerArray = this.markers.toArray();
    const marker = markerArray[index];

    if (marker) {
      this.infoContent=""
      const content =this.markerPositions[index].address
      if(content.street!=""){
        this.infoContent=content.street+", "
      }
      if(content.suburb!=""){
        this.infoContent=this.infoContent+content.suburb+", "
      }
      if(content.zip_code!=""){
        this.infoContent=this.infoContent+content.city+" "+content.zip_code+", "
      }
      this.infoContent = this.infoContent+content.state+", "+content.country;
      this.infoWindow.open(marker);
    }
  }
}
