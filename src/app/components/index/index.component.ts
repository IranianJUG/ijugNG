import { Component } from '@angular/core';
import {HeaderComponent} from "./header/header.component";
import {RecentEventsComponent} from "./recent-events/recent-events.component";

@Component({
  selector: 'app-index',
  standalone: true,
  imports: [
    HeaderComponent,
    RecentEventsComponent
  ],
  templateUrl: './index.component.html',
  styleUrl: './index.component.scss'
})
export class IndexComponent {

}
