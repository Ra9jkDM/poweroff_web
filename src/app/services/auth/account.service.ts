import { Injectable } from '@angular/core';
import { User } from './user';
import { IParams, RequestService } from '../requests.service';
import { LocalStorageService } from '../local-storage/local-storage.service';
import { ConfigService } from './config.service';
import {  Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  readonly loginPage: string = "/login"
  readonly refreshToken: string = "refresh_token"
  readonly accessToken: string = "access_token"

  constructor(private router: Router,
    private request: RequestService, private localStorage: LocalStorageService,
    private config: ConfigService) { }

  async login(user: User) {
    const response = await this.request.post(this.getUrl("login/token"),
        user.get(),
        {"Content-Type": "application/x-www-form-urlencoded"})

    if (response.ok) {
        let data = response.json()
        await data.then((json) => {
            this.localStorage.saveData(this.refreshToken, json.refresh_token)
            this.localStorage.saveData(this.accessToken, json.access_token)
        })

       return true
    }

    return false
  }

  async getTokens() {
    return await this.post("login/get", {"refresh_token": this.getRefreshToken()})
  }

  async get(url: string, params: Array<IParams>=[]) {
    const response = await this._get(url, params)

    if (response.status==200) {
        return response
    } else if (response.status == 401) { // Unauthorized 
        let isRefreshTokenActive = await this.relogin()
        if (isRefreshTokenActive) {
            return await this._get(url, params)
        } else {
            this.logout()
        }
    }
    
    return false
  }

  async post(url: string, data: any) {
    const response = await this._post(url, data)

    if (response.status==200) {
        return response
    } else if (response.status == 401) { // Unauthorized 
        let isRefreshTokenActive = await this.relogin()
        if (isRefreshTokenActive) {
            return await this._post(url, data)
        } else {
            this.logout()
        }
    }
    
    return false
  }

  async logout(){
    this.localStorage.clearData()
    this.router.navigate([this.loginPage])
  }

  private async _get(url: string, params: Array<IParams>=[]) {
    const response = await this.request.get(this.getUrl(url), 
        {"Authorization": `Bearer ${this.getAccessToken()}`}, params)
    return response
  }

  private async _post(url: string, data: any) {
    const response = await this.request.post(this.getUrl(url),
        JSON.stringify(data), 
        {"Content-Type": "application/json",
        "Authorization": `Bearer ${this.getAccessToken()}`})
    return response
  }
  
  private async relogin() {
    const response = await this.request.post(this.getUrl("login/refresh"), 
        JSON.stringify({"refresh_token": this.getRefreshToken()}), 
        {"Content-Type": "application/json"})

    if (response.status==200) {
        await response.json().then((json) => {
            this.localStorage.saveData(this.accessToken, json.access_token)
        })
        return true
    } else {
        return false
    }
  }

  private getRefreshToken() {
    return this.localStorage.getData(this.refreshToken)
  }

  private getAccessToken() {
    return this.localStorage.getData(this.accessToken)
  }

  private getUrl(url: string) {
    return `${this.config.api}${url}`
  }
}
