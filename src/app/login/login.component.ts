import { Component, OnInit } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Router } from "@angular/router";
import { CommonModule } from '@angular/common';

import * as configData from "../../assets/config.json"

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule ,RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  id: number = 0
  apiList: any;
  image?: string; 

  constructor(private route: ActivatedRoute,
    private router: Router) {
      this.apiList = configData.api;

      this.changeImage(this.id);
    }

  ngOnInit() {
    console.log("test")
    console.log(configData.api)
  }

  onCangeApi(obj: any) {
    this.id = obj.target.value
    this.changeImage(this.id)
  }

  private changeImage(id: number) {
    this.image = configData.imagePath + this.apiList[id].image;
  }

  onSubmit(form: NgForm) {
    console.log(form.value)

    // get token
    localStorage.setItem("id", this.id.toString())
    localStorage.setItem("token", "dfj023nqemf087dv8acv7zc9dv")
    console.log("now set", localStorage.getItem("token"))

    this.router.navigate([""])
  }
}
// https://jscrambler.com/blog/working-with-angular-local-storage
// https://blog.angular-university.io/angular-jwt-authentication/
