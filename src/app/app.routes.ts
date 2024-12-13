import { Routes } from '@angular/router';
import {IndexComponent} from "./components/index/index.component";
import {EventsComponent} from "./components/events/events.component";
import {EventComponent} from "./components/events/event/event.component";
import {
  Error404Component
} from "./components/errors/error-404/error-404.component";
import {UserComponent} from "./components/user/user.component";
import {TicketComponent} from "./components/user/tickets/ticket/ticket.component";
import {TicketsComponent} from "./components/user/tickets/tickets.component";
import {PaymentsComponent} from "./components/user/payments/payments.component";

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
    path: 'user',
    children:[
      {
        path: '',
        component:UserComponent
      },
      {
        path:'tickets',
        children:[
          {
            path: '',
            component:TicketsComponent
          },
          {
            path: ':id',
            component:TicketComponent
          }
        ]
      },
      {
        path:'payments',
        children:[
          {
            path: '',
            component:PaymentsComponent
          },
        ]
      }
    ]
  },
  {
    path: 'errors',
    children: [{
      path: '404',
      component: Error404Component
    }]
  }
];
