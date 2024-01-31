export class User {
    grant_type: string = "password"
    username: string = ""
    password: string = ""

    constructor(username: string, password: string) {
        this.username = username
        this.password = password
    }

    get() {
        return`grant_type=${this.grant_type}&username=${this.username}&password=${this.password}`
    }
  }