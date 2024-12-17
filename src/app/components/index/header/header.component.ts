import { Component, OnInit } from '@angular/core';

import { faLock } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faGlobe, faUser, faBars } from '@fortawesome/free-solid-svg-icons';
import { TranslateModule } from '@ngx-translate/core';

import { TranslationService } from '../../../i18n';
import { LoginComponent } from '../../login/login.component';
import { LoginService } from '../../../services/login.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
  standalone: true,
  imports: [FontAwesomeModule, TranslateModule, LoginComponent, RouterLink],
})
export class HeaderComponent implements OnInit {
  isModalOpen: boolean = false;
  faLock = faLock;
  faInternational = faGlobe;
  faUser = faUser;
  faHamburger = faBars;
  languages = ['fa', 'en'];
  headerMenu = [
    {
      route: '/#',
      name: 'about',
    },
    {
      route: '/#',
      name: 'contact',
    },
    {
      route: '/#',
      name: 'blog',
    },
    {
      route: '/events',
      name: 'events',
    },
    {
      route: '/#',
      name: 'resources',
    },
  ];
  userToken: string | null = null;

  userData: any = null;

  constructor(
    private translationService: TranslationService,
    private loginService: LoginService
  ) {}

  ngOnInit() {
    this.userToken = this.loginService.getUserToken();
    this.userData = this.loginService.getUserData();
  }

  protected changeLanguage(locale: string): void {
    this.translationService.setLanguage(locale);
  }

  protected openLoginModal(): void {
    this.isModalOpen = true;
  }

  protected closeLoginModal(): void {
    this.isModalOpen = false;
  }
}
