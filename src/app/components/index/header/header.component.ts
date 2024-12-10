import { Component } from '@angular/core';

import { faLock } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faGlobe } from '@fortawesome/free-solid-svg-icons/faGlobe';
import { faBars } from '@fortawesome/free-solid-svg-icons/faBars';
import { TranslateModule } from '@ngx-translate/core';

import { TranslationService } from '../../../i18n';
import { LoginComponent } from '../../login/login.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
  standalone: true,
  imports: [FontAwesomeModule, TranslateModule, LoginComponent],
})
export class HeaderComponent {
  isModalOpen: boolean = false;
  faLock = faLock;
  faInternational = faGlobe;
  faHamburger = faBars;
  languages = ['fa', 'en'];
  headerMenu = [
    {
      route: '/about',
      name: 'about',
    },
    {
      route: '/contact',
      name: 'contact',
    },
    {
      route: '/blog',
      name: 'blog',
    },
    {
      route: '/events',
      name: 'events',
    },
    {
      route: '/resources',
      name: 'resources',
    },
  ];

  constructor(private translationService: TranslationService) {}

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
