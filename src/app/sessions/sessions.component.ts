import { Component, ViewChild } from '@angular/core';
import { NgFor, NgIf, DatePipe } from '@angular/common';
import { AccountService } from '../services/auth/account.service';
import { UserService } from '../services/api/user.service';
import { RouterLink } from '@angular/router';
import { NotificationComponent } from '../notification/notification.component';

@Component({
  selector: 'app-sessions',
  standalone: true,
  imports: [NgFor, NgIf, DatePipe, RouterLink, NotificationComponent],
  templateUrl: './sessions.component.html',
  styleUrl: './sessions.component.scss'
})
export class SessionsComponent {
  sessions?: any

  @ViewChild(NotificationComponent)
  notification!: NotificationComponent

  constructor(private user: UserService) {

      this.user.isLogin()
      this.loadSessions()
      
  }

  async loadSessions(){
    let response = await this.user.getTokens()

    if (response) {
      response.json().then((data) => {
        this.sessions = data
        this.sessions.sort(this.sortByDate)
      })
    }
  }

  private sortByDate(a: any, b: any) {
    if(a.current) {
      return -1
    } if(b.current) {
      return 1
    } else if (a.id < b.id) {
      return -1
    } else if (a.id > b.id) {
      return 1
    }
    return 0
  }

  async delete(id: number) {
    let response = await this.user.deleteTokens([id])

    if (response) {
      this.sessions = this.sessions.filter((e: any) => 
        e.id != id
      )
    } else {
      this.notification.showNotification()
    }
  }

  async deleteAll() {
    let toDelete: Array<any> = []
    await this.sessions.forEach((e: any) => {
      if (!e.current) {
        toDelete.push(e.id)
      }
    });

    let response = await this.user.deleteTokens(toDelete)

    if (response) {
      this.sessions = this.sessions.filter((e: any) => e.current) 
    } else {
      this.notification.showNotification()
    }
  }
}
