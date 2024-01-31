import { Routes } from '@angular/router';

import { LoginComponent } from './login/login.component';
import { MainComponent } from './main/main.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { SessionsComponent } from './sessions/sessions.component';

export const routes: Routes = [
    {path: "login", component: LoginComponent},
    {path: "", component: MainComponent},
    {path: "sessions", component: SessionsComponent},
    {path: "**", component: PageNotFoundComponent}
];
