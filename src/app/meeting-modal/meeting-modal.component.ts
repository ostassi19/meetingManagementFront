import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import {Meeting} from "../models/meeting";

@Component({
  selector: 'app-meeting-modal',
  templateUrl: './meeting-modal.component.html',
  styleUrls: ['./meeting-modal.component.scss']
})
export class MeetingModalComponent implements OnInit {

  @Input() meeting: Meeting = new Meeting();

  @Output() addMeeting = new EventEmitter<Meeting>();

  start_date = '';
  end_date = '';

  constructor(public activeModal: NgbActiveModal) { }

  ngOnInit() {
    console.log(typeof this.meeting.start_hour)
    this.start_date = this.dateToString(new Date(this.meeting.start_hour))
    this.end_date = this.dateToString(new Date(this.meeting.end_hour))
  }

  dateToString(date : Date = new Date()){
    let d = date.toISOString();
    return  d.substring(0, 16);
  }

  save(){
    this.meeting.start_hour = new Date(this.start_date)
    this.meeting.end_hour = new Date(this.end_date)
    this.addMeeting.emit(this.meeting)
  }
}
