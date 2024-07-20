import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FooterComponent } from "./shared/footer/footer.component";
import { HeaderComponent } from './shared/header/header.component';


declare var $: any;
declare function HOMEINIT([]):any;


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, FooterComponent, HeaderComponent, FooterComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'ecommerce-2024';

  constructor(

  ){
    setTimeout(()=>{
      HOMEINIT($);
    }, 50);
	  $(window).on('load', function () {
		$("#loading").fadeOut(500);
	});


  }

}
