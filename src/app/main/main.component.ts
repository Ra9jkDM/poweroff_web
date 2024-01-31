import { Component, ViewChild } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Router } from "@angular/router";

import { NotificationComponent } from '../notification/notification.component';
import { ConfigService } from '../services/auth/config.service';
import { AccountService } from '../services/auth/account.service';
import { UserService } from '../services/api/user.service';
import { PowerService } from '../services/api/power.service';

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [RouterLink, NotificationComponent],
  templateUrl: './main.component.html',
  styleUrl: './main.component.scss'
})
export class MainComponent {
  name?: string
  image?: string
  animation_class?: string

  @ViewChild(NotificationComponent)
  notification!: NotificationComponent

  constructor(private router: Router,
    private config: ConfigService, private account: AccountService, 
    private user: UserService, private power: PowerService) {
      
      this.user.isLogin()
      this.setInfo()
    }

    private setInfo() {
      this.name = this.config.name
      this.image = this.config.image
    }

    logout() {
      this.account.logout()
    }

    async shutdown() {
      let response = await this.power.shutdown()

      if (response) {
        this.animation_class="shutdown"
      } else {
        this.animation_class=""
        this.notification.showNotification()
      }    
    }

    async reboot() {
      let response = await this.power.reboot()

      if (response) {
        this.animation_class="reboot"
      } else {
        this.animation_class=""
        this.notification.showNotification()
      }

    }

}
