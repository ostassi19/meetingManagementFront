import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {CalendarView} from 'angular-calendar';
import {Meeting} from '../../models/meeting';

@Component({
  selector: 'digitalUP-calendar-header',
  template: `
    <div class="row text-center">
      <div class="col-md-4">
        <div class="btn-group">
          <div
            class="btn btn-primary"
            mwlCalendarPreviousView
            [view]="view"
            [(viewDate)]="viewDate"
            (viewDateChange)="viewDateChange.next(viewDate)"
          >
            Previous
          </div>
          <div
            class="btn btn-outline-secondary"
            mwlCalendarToday
            [(viewDate)]="viewDate"
            (viewDateChange)="viewDateChange.next(viewDate)"
          >
            Today
          </div>
          <div
            class="btn btn-primary"
            mwlCalendarNextView
            [view]="view"
            [(viewDate)]="viewDate"
            (viewDateChange)="viewDateChange.next(viewDate)"
          >
            Next
          </div>
        </div>
      </div>
      <div class="col-md-4">
        <h3>{{ viewDate | calendarDate: view + 'ViewTitle':locale }}</h3>
      </div>
      <div class="col-md-4">
        <div class="btn-group">
          <div
            class="btn btn-primary"
            (click)="viewChange.emit(CalendarView.Month)"
            [class.active]="view === CalendarView.Month"
          >
            Month
          </div>
          <div
            class="btn btn-primary"
            (click)="viewChange.emit(CalendarView.Week)"
            [class.active]="view === CalendarView.Week"
          >
            Week
          </div>
          <div
            class="btn btn-primary"
            (click)="viewChange.emit(CalendarView.Day)"
            [class.active]="view === CalendarView.Day"
          >
            Day
          </div>
          <div
              class="btn btn-success"
              (click)="addMeeting.emit()"
          >
            Add
          </div>
        </div>
      </div>
    </div>
    <br />
	`,
  styleUrls: ['./calendar-header.component.scss']
})
export class CalendarHeaderComponent {

  @Input() view: CalendarView;

  @Input() viewDate: Date;

  @Input() locale: string = 'en';

  @Output() viewChange = new EventEmitter<CalendarView>();

  @Output() addMeeting = new EventEmitter();

  @Output() viewDateChange = new EventEmitter<Date>();

  CalendarView = CalendarView;

}
