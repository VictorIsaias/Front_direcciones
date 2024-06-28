import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';

if(!navigator.geolocation){
  alert('Agrega una direccion')
}

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));
