import { Routes } from '@angular/router';
import {IndexComponent} from "./components/index/index.component";
import {EventsComponent} from "./components/events/events.component";
import {EventComponent} from "./components/events/event/event.component";
import {
  Error404Component
} from "./components/errors/error-404/error-404.component";

export const routes: Routes = [
  {
    path: '',
    component:IndexComponent,
  },
  {
    path: 'events',
    component:EventsComponent,
  },
  {
    path: 'events/:slug',
    component: EventComponent
  },
  {
    path: 'errors',
    children: [{
      path: '404',
      component: Error404Component
    }]
  }
];
