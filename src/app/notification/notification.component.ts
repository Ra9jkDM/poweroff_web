import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-notification',
  standalone: true,
  imports: [],
  templateUrl: './notification.component.html',
  styleUrl: './notification.component.scss'
})
export class NotificationComponent {
  @Input() info: string = ""
  notification: string = "none"

  hide() {
    this.hideNotification()
  }

  public showNotification() {
    this.notification = "block"
  }
  public hideNotification() {
    this.notification = "none"
  }
}
