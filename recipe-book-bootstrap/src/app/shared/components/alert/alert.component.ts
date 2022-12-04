import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.sass'],
})
export class AlertComponent implements OnInit {
  @Input() errorMessage: string;
  @Output() closeAlert = new EventEmitter<void>();

  constructor() {}

  onClose() {
    this.closeAlert.emit();
  }

  ngOnInit(): void {}
}
