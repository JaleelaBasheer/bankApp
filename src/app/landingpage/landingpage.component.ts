import { Component } from '@angular/core';

@Component({
  selector: 'app-landingpage',
  templateUrl: './landingpage.component.html',
  styleUrls: ['./landingpage.component.css']
})
export class LandingpageComponent {

  isReadMore:boolean=true
  toggle(){
    this.isReadMore = !this.isReadMore
  }
}
