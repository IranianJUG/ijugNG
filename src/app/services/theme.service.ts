import { Injectable } from '@angular/core';
const THEME_STORAGE_KEY = 'theme';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {

  constructor() { }

  setTheme(theme: string) {
    localStorage.setItem(THEME_STORAGE_KEY,theme)
    this.changeTheme(theme)
  }

  getTheme(): string | null {
    let theme =localStorage.getItem(THEME_STORAGE_KEY)
    if (!theme){
      theme="winter"
    }
    this.changeTheme(theme)
    return theme
  }


  changeTheme(theme:string){
    // @ts-ignore
    document['data-theme']=theme
  }
}
