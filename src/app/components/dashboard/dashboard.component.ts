import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {
  cookieValue:String;
  isAdmin:boolean=false
  navItems

  constructor(private apiService: ApiService,private cookieService: CookieService,private router: Router,private auth:ApiService){
    this.cookieValue = this.cookieService.get('token')
    this.navItems = [
      { name: 'Inicio', icon: 'home', route: '/' },
      { name: 'Añadir Dirección', icon: 'add', route: '/add-address' },
      { name: 'Mostrar Direcciones', icon: 'list', route: '/find-addresses' },
      { name: 'Cerrar sesion', icon: 'logout', route: '/login'}
    ];
  }
  ngOnInit(): void {
    this.auth.get("show-user",this.cookieValue).subscribe(response => {
      console.log(response)
      if(response.user.role_id==1){
        this.isAdmin=true
        this.navItems = [
          { name: 'Inicio', icon: 'home', route: '/' },
          { name: 'Mostrar Todas las Direcciones', icon: 'list_alt', route: '/all-addresses' },
          { name: 'Cerrar sesion', icon: 'logout', route: '/login'}
        ]
      }
    })
    console.log(this.cookieService.get('token'))
  }

  


  async clickElem(item:{name:string,icon:string,route:string}){
    if(item.icon=="logout"){
      await this.apiService.post({},"logout",this.cookieValue).subscribe(response => {
        this.router.navigate(['/login'])
      })
        
    }else{
      this.router.navigate(['/dashboard'+item.route])

    }
  }


}
