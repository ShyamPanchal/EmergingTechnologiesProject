import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthenticationComponent } from './authentication/authentication.component'
import { HomeComponent } from './home/home.component'
import { AuthGuard } from './authentication/auth/auth-guard.service';

const routes: Routes = [
  { path: '', component: AuthenticationComponent },
  { path: 'home', component: HomeComponent, canActivate: [AuthGuard] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
