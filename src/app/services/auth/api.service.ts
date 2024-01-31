import { Injectable } from '@angular/core';
import { LocalStorageService } from '../local-storage/local-storage.service';
import * as config from "../../../assets/config.json"

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  readonly apiIdName: string = "api_id"

  private _apiId: number = 0

  constructor(private localStorage: LocalStorageService) { }

  set apiId(value: number) {
    if (value < 0 || value > config.api.length) {
      throw new Error("API does not exists")
    }

    this.localStorage.saveData(this.apiIdName, value.toString())
    this._apiId = value
  }

  get apiId() {
    let tmp = this.localStorage.getData(this.apiIdName)
    if (tmp) {
        this._apiId = Number(tmp)
    } else {
      this._apiId = 0
    }

    return this._apiId
  }

  get allApi() {
    return config.api
  }

  get api() {
    return config.api[this.apiId]
  }

  get config() {
    return config
  }
}