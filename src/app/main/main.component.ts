import { Component } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Router } from "@angular/router";

import * as configData from "../../assets/config.json"

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './main.component.html',
  styleUrl: './main.component.scss'
})
export class MainComponent {
  api: any;
  image?: string;

  constructor(private route: ActivatedRoute,
    private router: Router) {
      let id = this.getId()

      this.api = configData.api[id]
      this.setImage()
      
      console.log("get", localStorage.getItem("token"))
      // if (!localStorage.getItem("token")) {
      //   console.log(localStorage.getItem("token"))
      //     this.router.navigate(["/login"])
      // }

      this.api = this.route.snapshot.paramMap.get("api")
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

    logout() {
      localStorage.removeItem("token")
      this.router.navigate(["/login"])
    }

    shutdown() {

    }

    reboot() {

    }

}
