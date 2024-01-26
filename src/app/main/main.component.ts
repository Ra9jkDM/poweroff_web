import { Component } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Router } from "@angular/router";

import * as configData from "../../assets/config.json"
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { response } from 'express';

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [RouterLink, HttpClientModule],
  templateUrl: './main.component.html',
  styleUrl: './main.component.scss'
})
export class MainComponent {
  api: any
  image?: string
  animation_class?: string
  notification?: string = "none"

  constructor(private route: ActivatedRoute,
    private router: Router, private http: HttpClient) {
      let id = this.getId()

      this.api = configData.api[id]
      this.setImage()
      
      // console.log("get", localStorage.getItem("token"))
      if (!this.getToken()) {
        this.router.navigate(["/login"])
      }

      console.log(this.api)
    }

    logout() {
      localStorage.removeItem("token")
      this.router.navigate(["/login"])
    }

    shutdown() {
      this.get("shutdown")
    }

    reboot() {
      this.get("reboot")
    }

    private getId() {
      let tmp = localStorage.getItem("id")
      let str = tmp==null ? "0": tmp
      let id: number = parseInt(str)

      return id
    }

    private setImage() {
      this.image = configData.imagePath + this.api.image
    }

    private getToken() {
      return localStorage.getItem("token")
    }

    private get(path: string) {
      return this.http.get<any>(this.api.api+path, {
        headers: {"Authorization": "Bearer "+ this.getToken()}
      }).subscribe({
        next: (status)=> {
          if (status == "Success") {
            this.animation_class=path;
          } else {
            this.showNotification()
          }
        },
        error: (e) => {
          this.showNotification()
        }
      })
    }

    hide() {
      this.hideNotification()
    }

    private showNotification() {
      this.notification = "block"
    }
    private hideNotification() {
      this.notification = "none"
    }

}
