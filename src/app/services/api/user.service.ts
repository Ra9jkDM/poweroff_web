import { Injectable } from '@angular/core';
import { AccountService } from '../auth/account.service';


@Injectable({
  providedIn: 'root'
})
export class UserService {
    constructor(private account: AccountService) {

    }

    async isLogin() {
        return this.account.get("user/active")
    }

    async getTokens() {
        return this.account.getTokens()
    }

    async deleteTokens(tokens: Array<number>) {
        return this.account.post("login/delete", {"tokens": tokens})
    }
}