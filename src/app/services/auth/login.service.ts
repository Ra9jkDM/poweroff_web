import { Injectable } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { LocalStorageService } from '../local-storage/local-storage.service';
import { User } from './user';
import * as config from "../../../assets/config.json"
import { ApiService } from './api.service';
import { ConfigService } from './config.service';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  readonly refreshToken: string = "refresh_token"
  readonly accessToken: string = "access_token"


  constructor(private http: HttpClient, private localStorage: LocalStorageService,
    private config: ConfigService) { }

  public async login(user: User) {
    return new Promise(async (resolve) => {
      await this.http.post<any>(`${this.config.api}login/token`, user.get(), 
      {headers:{"Content-Type": "application/x-www-form-urlencoded"}}).subscribe({
        next: (data) => {
        // console.log(data)
        this.localStorage.saveData(this.refreshToken, data.refresh_token)
        this.localStorage.saveData(this.accessToken, data.access_token)

        resolve(true)
      }, error: (e) => {
        resolve(false)
      }
      })
    })
  }

  isLogin() {
    return this._get("user/active")
  }

  async reboot() {
    return this.get("power/reboot")
  }

  async shutdown() {
    return this.get("power/shutdown")
  }

  public get(url: string) {
    return new Promise(async (resolve) => {
      await this._get(url).then((status) => {
        if (!status) {
          console.log("Create acc tok")
          this.createToken().then(async (data)=> {
            console.log(data)
            resolve({"refresh_token": data,
                        "result": await this._get(url)})
          })
        }
      })
    })
  }

  private _get(url: string) {
    return new Promise(async (resolve) => {
      await this.http.get(this.config.api + url, {
        headers: {"Authorization": "Bearer "+this.getAccessToken()}
      }).subscribe({
        next: (data) => {
          resolve(data)
        }, error: (e) => {
          resolve(false)
        }

      })
    })
  }

  private _post(url: string, body: any) {
    return new Promise(async (resolve) => {
      await this.http.post(this.config.api + url, body,{
        headers: {"Authorization": "Bearer "+ this.getAccessToken(),
                  "Content-Type": "application/json"
      },
      
      }).subscribe({
        next: (data) => {
          resolve(data)
        }, error: (e) => {
          resolve(false)
        }

      })
    })
  }

  private getAccessToken() {
    return this.localStorage.getData(this.accessToken)
  }
  
  private getRefreshToken() {
    return this.localStorage.getData(this.refreshToken)
  }

  public createToken() {
    return this._post("login/refresh", {"refresh_token":this.getRefreshToken()}).then((data: any) => {
      console.log("create access token", data)
      if (data.status_code == 200) {
        this.localStorage.saveData(this.accessToken, data.access_token)
        return true
      } else {
        return false
      }
    })
  }

  public getTokens() {
    
  }

  public deleteTokens() {

  }
}
