import { Component } from '@angular/core';
import {HeaderComponent} from "../index/header/header.component";
import {FooterComponent} from "../index/footer/footer.component";

@Component({
  selector: 'app-events',
  standalone: true,
  imports: [
    HeaderComponent,
    FooterComponent
  ],
  templateUrl: './events.component.html',
  styleUrl: './events.component.scss'
})
export class EventsComponent {
  events = ['هفدهمین رویداد تهران جاگ','شانزدهمین رویداد تهران جاگ','جشن روز' +
  ' برنامه نویس','جلسه پانزدهم تهران جاگ','جلسه چهاردهم تهران جاگ']

}
