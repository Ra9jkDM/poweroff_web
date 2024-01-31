import { Injectable } from '@angular/core';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class ConfigService { 
    constructor (private _api: ApiService) {}

    get allName() {
        let apiNames: Array<string> = []
        Object.values(this._api.allApi).forEach(value=> {
            apiNames.push(value.name)
        })
        return apiNames
    }

    get name() {
        return this._api.api.name
    }

    get image() {
        return this._api.config.imagePath + this._api.api.image
    }

    get api() {
        return this._api.api.api
    }

}