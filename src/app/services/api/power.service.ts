import { Injectable } from '@angular/core';
import { AccountService } from '../auth/account.service';
import { IParams } from '../requests.service';


@Injectable({
  providedIn: 'root'
})
export class PowerService {
    constructor(private account: AccountService) {

    }

    async shutdown() {
        return this.account.get("power/shutdown")
    }

    async reboot() {
        return this.account.get("power/reboot")
    }
}