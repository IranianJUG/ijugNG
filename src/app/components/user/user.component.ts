import {Component, OnInit} from '@angular/core';
import {TranslateModule} from "@ngx-translate/core";
import {LoginService} from "../../services/login.service";

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [
    TranslateModule
  ],
  templateUrl: './user.component.html',
  styleUrl: './user.component.scss'
})
export class UserComponent implements OnInit{

  userData:any = null

  constructor(private loginService:LoginService) {
  }
  ngOnInit() {
    this.userData = this.loginService.getUserData()
    console.log(this.userData)
  }
}
