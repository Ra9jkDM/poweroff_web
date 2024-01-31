import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RequestService {

  constructor() { }

  async get(url: string, headers: any={}, params: Array<IParams>=[]) {
    const data = new URLSearchParams();

    for(let i=0; i<params.length; i++) {
        data.append(params[i].name, params[i].value)
    }

    const result = await fetch(`${url}?${data}`, {
        method: "GET",
        headers: headers
    })

    return result
  }

  async post(url: string, data: any, headers: any={}) {
    const result = await fetch(url, {
        method: "POST",
        headers: headers,
        body: data //JSON.stringify()
    })
    return result
  }
}

export class IParams {
    name: string
    value: string

    constructor (name: string, value: string) {
        this.name=name
        this.value=value
    }
}