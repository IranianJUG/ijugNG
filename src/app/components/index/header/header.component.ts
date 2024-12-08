import {Component} from '@angular/core';
import {NgOptimizedImage} from "@angular/common";
import {faLock} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";
import {TranslateModule, TranslateService} from "@ngx-translate/core";
import {faGlobe} from "@fortawesome/free-solid-svg-icons/faGlobe";
import {TranslationService} from "../../../i18n";
import {faBars} from "@fortawesome/free-solid-svg-icons/faBars";

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    NgOptimizedImage,
    FontAwesomeModule,
    TranslateModule
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  faLock = faLock
  faInternational = faGlobe
  faHamburger = faBars
  languages = ['fa', 'en'];
  headerMenu = [
    {
      route:'/about',
      name:'about',
    },
    {
      route:'/contact',
      name:'contact',
    },
    {
      route:'/blog',
      name:'blog',
    },
    {
      route:'/events',
      name:'events',
    },
    {
      route:'/resources',
      name:'resources',
    }
  ];
  constructor(private translationService: TranslationService) {
  }


  changeLanguage(locale:string){
    this.translationService.setLanguage(locale)
  }
}
