import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {IndexComponent} from "./components/index/index.component";
import {LoadingBarModule} from "@ngx-loading-bar/core";
import {TranslationService} from "./i18n";
import { locale as enLang } from "./i18n/vocabs/en"
import { locale as faLang } from "./i18n/vocabs/fa"
import {FooterComponent} from "./components/index/footer/footer.component";
import {HeaderComponent} from "./components/index/header/header.component";

@Component({
  selector: 'app-root',
  standalone: true,
    imports: [RouterOutlet, IndexComponent, LoadingBarModule, FooterComponent, HeaderComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  constructor(private translationService:TranslationService) {
    this.translationService.loadTranslations(enLang, faLang);
  }
}
