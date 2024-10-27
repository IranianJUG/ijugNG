import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {IndexComponent} from "./components/index/index.component";
import {LoadingBarModule} from "@ngx-loading-bar/core";
import {TranslationService} from "./i18n";
import { locale as enLang } from "./i18n/vocabs/en"
import { locale as faLang } from "./i18n/vocabs/fa"

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, IndexComponent, LoadingBarModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  constructor(private translationService:TranslationService) {
    this.translationService.loadTranslations(enLang, faLang);
  }
}
