import { Component, ViewChild } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Router } from "@angular/router";

import { NotificationComponent } from '../notification/notification.component';
import { LoginService } from '../services/auth/login.service';
import { ConfigService } from '../services/auth/config.service';
import { LocalStorageService } from '../services/local-storage/local-storage.service';

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [RouterLink, NotificationComponent],
  templateUrl: './main.component.html',
  styleUrl: './main.component.scss'
})
export class MainComponent {

  image?: string
  animation_class?: string

  @ViewChild(NotificationComponent)
  notification!: NotificationComponent

  constructor(private route: ActivatedRoute, private router: Router,
     private login: LoginService, private config: ConfigService,
     private localStorage: LocalStorageService) {
      this.setImage()
      
      if (!this.login.isLogin()) {
        this.router.navigate(["/login"])
      }
    }

    private setImage() {
      this.image = this.config.image
    }

    logout() {
      this.localStorage.clearData()
      this.router.navigate(["/login"])
    }

    shutdown() {
      this.login.shutdown().then((status: any) => {
        if (!status.refresh_token) {
          this.logout()
        } else {
          status.result.then((data: boolean) => {
            if (data) {
              this.animation_class="shutdown"
            } else {
              this.notification.showNotification()
            }
          })
        }
      })
    }

    reboot() {
      this.login.reboot().then((status: any) => {
        if (!status.refresh_token) {
          this.logout()
        } else {
          status.result.then((data: boolean) => {
            if (data) {
              this.animation_class="reboot"
            } else {
              this.notification.showNotification()
            }
          })
        }
      })
    }

}
