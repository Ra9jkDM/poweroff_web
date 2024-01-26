import { Component, OnInit } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Router } from "@angular/router";
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';

import * as configData from "../../assets/config.json"
import {User} from "./user";

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule ,RouterLink, HttpClientModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})


export class LoginComponent {
  id: number = 0
  apiList: any;
  image?: string; 

  constructor(private route: ActivatedRoute,
    private router: Router, private http: HttpClient) {
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
    
    let url = this.apiList[this.id].api
    let user: User = new User(form.value.login, form.value.password)
    this.http.post<any>(url+"token", user.get(), 
    {headers:{"Content-Type": "application/x-www-form-urlencoded"}}).subscribe(token => {
      // console.log(token)
      localStorage.setItem("id", this.id.toString())
      localStorage.setItem("token", token.access_token)

      // console.log("now set", localStorage.getItem("token"))
      this.router.navigate([""])
    })

    // fetch("http://127.0.0.1:8000/token", {method: "POST",
    // body: "grant_type=password&username=bob&password=pass", headers: {
    //   "Content-type": "application/x-www-form-urlencoded; charset=UTF-8"
    // }}).then((r)=>
    // console.log(r.json()))
    // get token
    // localStorage.setItem("id", this.id.toString())
    // localStorage.setItem("token", "dfj023nqemf087dv8acv7zc9dv")
    // console.log("now set", localStorage.getItem("token"))

    // this.router.navigate([""])
  }
}
// https://jscrambler.com/blog/working-with-angular-local-storage
// https://blog.angular-university.io/angular-jwt-authentication/
