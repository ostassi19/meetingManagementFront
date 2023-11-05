import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {CalendarEventComponent} from './calendar-event/calendar-event.component';


const routes: Routes = [
  {
    path: 'calendar-event',
    component: CalendarEventComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
