import { Component, OnInit, ViewChild } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Router } from "@angular/router";
import { CommonModule } from '@angular/common';

import {User} from "../services/auth/user";
import { NotificationComponent } from '../notification/notification.component';
import { LoginService } from '../services/auth/login.service'; 
import { ApiService } from '../services/auth/api.service';
import { ConfigService } from '../services/auth/config.service';


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

  constructor(private route: ActivatedRoute, private router: Router,  
    private login: LoginService, private api: ApiService, private config: ConfigService) {

      this.changeImage()
    }

  onCangeApi(obj: any) {
    this.api.apiId = obj.target.value
    this.changeImage()
  }

  private changeImage() {
    this.image = this.config.image
  }

  async onSubmit(form: NgForm) { 
    let user: User = new User(form.value.login, form.value.password)
    let result = await this.login.login(user)
    if (result) {
      this.router.navigate([""])
    } else {
      this.notification.showNotification()
    }
    
  }
}
