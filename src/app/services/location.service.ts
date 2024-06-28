import { Injectable } from '@angular/core';
import {GeolocationService} from '@ng-web-apis/geolocation';
interface component{
  long_name?:string,
  types?:Array<string>,
  lat?:number,
  lng?:number
}

@Injectable({
  providedIn: 'root'
})


export class LocationService {
  private geocoder: google.maps.Geocoder;

  
  constructor(private readonly geolocation: GeolocationService) { 
    this.getUserLocation()
    this.geocoder = new google.maps.Geocoder();

  }
  getAddressFromLatLng(lat: number, lng: number): Promise<Array<component>> {
    
    return new Promise((resolve, reject) => {
      const latLng = new google.maps.LatLng(lat, lng);
      this.geocoder.geocode({ location: latLng }, (results, status) => {
        if (status === google.maps.GeocoderStatus.OK) {
          if(results){
            if (results[0]) {

              resolve(results[0].address_components);
            } else {
              reject('No results found');
            }

          }
        } else {
          reject('Geocoder failed due to: ' + status);
        }
      });
    });
  }
  
  public async getUserLocation():Promise<Array<component>>{
    return new Promise((resolve, reject) => {
    this.geolocation.subscribe(position => {
      
      this.getAddressFromLatLng(position.coords.latitude,position.coords.longitude)
        .then(address => {
          address.push({
            lat:position.coords.latitude,
            lng:position.coords.longitude
          })
          resolve(address)
        })
        .catch(error => {
          reject('Error fetching address:');
        })
      
    }
    );
  }

  )
}


}
