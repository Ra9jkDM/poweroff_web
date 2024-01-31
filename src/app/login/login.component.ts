import { Component, OnInit, ViewChild } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { Router } from "@angular/router";
import { CommonModule } from '@angular/common';

import {User} from "../services/auth/user";
import { NotificationComponent } from '../notification/notification.component';
import { ApiService } from '../services/auth/api.service';
import { ConfigService } from '../services/auth/config.service';
import { AccountService } from '../services/auth/account.service';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule ,RouterLink, NotificationComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})


export class LoginComponent {
  apiNames: Array<string> = this.config.allName
  image?: string

  @ViewChild(NotificationComponent) 
  private notification!: NotificationComponent

  constructor(private router: Router,  
    private api: ApiService, private config: ConfigService,
    private account: AccountService) {

      this.changeImage()
    }

  onCangeApi(obj: any) {
    this.api.apiId = obj.target.value
    this.changeImage()
  }

  private async changeImage() {
    this.image = this.config.image
  }

  async onSubmit(form: NgForm) { 
    let user: User = new User(form.value.login, form.value.password)
    let result = await this.account.login(user)

    if (result) {
      this.router.navigate([""])
    } else {
        this.notification.showNotification()
    }   
  }
}
