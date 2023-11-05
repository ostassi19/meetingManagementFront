import {
  Component,
  ChangeDetectionStrategy,
  ViewChild,
  TemplateRef, OnInit, ViewEncapsulation,
} from '@angular/core';
import {
  isSameMonth,
  isSameDay,
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  startOfDay,
  endOfDay,
  format, addHours, addDays, addMinutes,
} from 'date-fns';
import {Observable, Subject} from 'rxjs';
import {NgbActiveModal, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {
  CalendarEvent,
  CalendarEventAction,
  CalendarEventTimesChangedEvent,
  CalendarView,
} from 'angular-calendar';
import { EventColor } from 'calendar-utils';
import {MettingService} from "../../services/MettingService";
import {map} from "rxjs/operators";
import {MeetingModalComponent} from "../meeting-modal/meeting-modal.component";
import {Meeting} from "../models/meeting";

const colors: Record<string, EventColor> = {
  red: {
    primary: '#ad2121',
    secondary: '#FAE3E3',
  },
  blue: {
    primary: '#1e90ff',
    secondary: '#D1E8FF',
  },
  yellow: {
    primary: '#e3bc08',
    secondary: '#FDF1BA',
  },
};

interface Film {
  id: number;
  title: string;
  description: string
  mail: string
  release_date: string;
}

@Component({
  selector: 'digitalUP-calendar-event',
  encapsulation: ViewEncapsulation.None,
  templateUrl: './calendar-event.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styles: [
    `
			h3 {
        margin: 0 0 10px;
      }

      pre {
        background-color: #f5f5f5;
        padding: 15px;
      }
    `,
  ],
})
export class CalendarEventComponent implements OnInit {

  meetings : Meeting[];
  meeting: Meeting = new Meeting();

  constructor(
    private meetingService: MettingService,
    private modal: NgbModal,
  ) { }

  @ViewChild('modalContent', {static: true}) modalContent: TemplateRef<any>;
  @ViewChild('fiche', {static: true}) fiche: TemplateRef<any>;

  view: CalendarView = CalendarView.Month;

  CalendarView = CalendarView;

  viewDate: Date = new Date();

  events$: Observable<CalendarEvent<{ meeting: any }>[]>;

  actions: CalendarEventAction[] = [
    {
      label: '<i class="fas fa-pencil-alt"></i>',
      a11yLabel: 'Edit',
      cssClass : 'color: #ffb822',
      onClick: ({event}: { event: CalendarEvent }): void => {
        this.openModal(event.meta);
      },
    },
    {
      label: '<i class="fas fa-fw fa-trash-alt"></i>',
      a11yLabel: 'Delete',
      onClick: ({ event }: { event: CalendarEvent }): void => {
        this.deleteEvent(event.meta);
      },
    },
  ];

  modalData: {
    action: string;
    event: CalendarEvent;
  };

  activeDayIsOpen = true;


  ngOnInit(): void {
    this.fetchEvents();
  }

  fetchEvents(): void {
    const getStart: any = {
      month: startOfMonth,
      week: startOfWeek,
      day: startOfDay,
    }[this.view];

    const getEnd: any = {
      month: endOfMonth,
      week: endOfWeek,
      day: endOfDay,
    }[this.view];

    this.events$ = this.meetingService.getOperations()
      .pipe(
        map((results) => {
          return results.map((meeting: any) => {
            let ds = new Date(meeting.start_hour);
            let de = new Date(meeting.end_hour)
            return {
              title: meeting.title + ' WITH ' + meeting.mail + ' FROM ' + this.dateToString(ds) + ' TO ' + this.dateToString(de),
              start: ds,
              end: de,
              color: colors[meeting.color],
              allDay: false,
              meta: meeting,
              actions: this.actions,
              draggable: true,
            };
          });
        })
      );
  }

  dateToString(date : Date = new Date()){
    let d = date.toISOString();
    return  d.substring(12, 16);
  }

  dayClicked({
               date,
               events,
             }: {
    date: Date;
    events: CalendarEvent<{ meeting: Film }>[];
  }): void {
    if (isSameMonth(date, this.viewDate)) {
      if (
        (isSameDay(this.viewDate, date) && this.activeDayIsOpen === true) ||
        events.length === 0
      ) {
        this.activeDayIsOpen = false;
      } else {
        this.activeDayIsOpen = true;
        this.viewDate = date;
      }
    }
  }

  eventClicked(event: CalendarEvent<{ meeting: Film }>): void { }

  handleEvent(action: string, event: CalendarEvent): void {
    this.modal.open(this.modalContent, {size : 'lg'});
  }

  eventTimesChanged({
                      event,
                      newStart,
                      newEnd,
                    }: CalendarEventTimesChangedEvent): void {

    const meet: any = event.meta;
    meet.id = null;
  }

  deleteEvent(meeting : Meeting) {
    this.meetingService.delete(meeting.id).subscribe(value => {
    })
  }

  setView(view: CalendarView) {
    this.view = view;
  }

  closeOpenMonthViewDay() {
    this.activeDayIsOpen = false;
  }

  modifier(meeting: Meeting = new Meeting(), newDate = null) {
    this.meeting = meeting;
    let id = meeting.id;

    if (id == null){
      this.meetingService.postOperation(meeting).subscribe(value => {console.log('Done')})
    }
    else this.meetingService.put(id, meeting).subscribe(value => {console.log('Done')})
  }

  openModal(meeting: Meeting = new Meeting()){
    this.meeting = meeting;
    console.log(typeof meeting.start_hour)
    this.modal.open(this.modalContent, { size : 'lg'});
  }
}
