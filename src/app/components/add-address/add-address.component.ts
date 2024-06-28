import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Loader } from "@googlemaps/js-api-loader"
import { MapGeocoder } from '@angular/google-maps';
import { LocationService } from 'src/app/services/location.service';
import { ApiService } from 'src/app/services/api.service';
import { CookieService } from 'ngx-cookie-service';
interface component{
  long_name?:string,
  types?:Array<string>,
  lat?:number,
  lng?:number
}

@Component({
  selector: 'app-add-address',
  templateUrl: './add-address.component.html',
  styleUrls: ['./add-address.component.scss']
})
export class AddAddressComponent implements OnInit {
  addressForm: FormGroup;
  center: google.maps.LatLngLiteral = {lat: 19.477862, lng: -99.1038131};
  zoom = 5;
  markerOptions: google.maps.MarkerOptions = {draggable: true};
  markerPosition: google.maps.LatLngLiteral | null = null;
  cookieValue:String;

  constructor(private cookieService: CookieService,private fb: FormBuilder,private locationService:LocationService,private apiService:ApiService) {
    this.cookieValue = this.cookieService.get('token')
    this.addressForm = this.fb.group({
      street: [''],
      suburb: [''],
      city: [''],
      state: [''],
      country: [''],
      zip_code: [''],
      latitude: [],
      longitude: []
    });
  }

  ngOnInit() {
    this.locationService.getUserLocation()
    .then(address => {
      this.fillAddressForm(address)
    })
    .catch(error => {
      console.error('Error fetching address:', error);
    })
  }

  onMapClick(event: google.maps.MapMouseEvent) {
    if (event.latLng) {
      this.markerPosition = event.latLng.toJSON();
      this.addressForm.patchValue({latitude:this.markerPosition.lat})
      this.addressForm.patchValue({longitude:this.markerPosition.lng})
      console.log(this.markerPosition.lat)
      this.locationService.getAddressFromLatLng(this.markerPosition.lat, this.markerPosition.lng)
        .then(address => {
          this.fillAddressForm(address);
        })
        .catch(error => {
          console.error('Error fetching address:', error);
        });
    }
  }

  fillAddressForm(components: Array<component>) {
    this.addressForm.patchValue({
      street: "",
      suburb: "",
      city: "",
      zip_code: "",
      state: "",
      country: ""
    });
    components.forEach(component => {
      if(component["types"]!){
        component["types"].forEach(type => {
          switch (type){
            case "street_number":
              this.addressForm.patchValue({street:this.addressForm.value["street"]+" "+component.long_name!})
              break
            case "route":
              this.addressForm.patchValue({street:component.long_name!+this.addressForm.value["street"]})
              break
            case "sublocality":
              this.addressForm.patchValue({suburb:component.long_name!})
              break
            case "locality":
              this.addressForm.patchValue({city:component.long_name!})
              break
            case "administrative_area_level_1" :
              this.addressForm.patchValue({state:component.long_name!})
              break
            case "country":
              this.addressForm.patchValue({country:component.long_name!})
              break
            case "postal_code":
              this.addressForm.patchValue({zip_code:component.long_name!})
              break
          }
        })
      }else{
        this.markerPosition = {
          lat:component.lat!,
          lng:component.lng!
        };
        this.addressForm.patchValue({latitude:component.lat!})
        this.addressForm.patchValue({longitude:component.lng!})
        
      }
    })
    
  }


  onSubmit() {
    this.apiService.post(this.addressForm.getRawValue(),"add-address",this.cookieValue).subscribe(response => {
      if(response){
       alert("Direccion registrada")
      }
    })
  }
  
}