import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule  }   from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthenticationComponent } from './authentication/authentication.component';
import { HomeComponent } from './home/home.component';
import { SignupComponent } from './authentication/signup/signup.component';
import { SigninComponent } from './authentication/signin/signin.component';

import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import 'hammerjs';

import { MatTabsModule } from '@angular/material';
import { SessionService } from './authentication/auth/session.service';
import { AuthGuard } from './authentication/auth/auth-guard.service';
import { PatientsComponent } from './home/patients/patients.component';
import { CourseComponent } from './home/course/course.component';
import { ViewPatientComponent } from './home/patients/viewpatientinfo/view.patient.component';
import { ViewLogComponent } from './home/patients/viewpatientinfo/viewlogs/view.log.component';
import { AddLogComponent } from './home/patients/viewpatientinfo/viewlogs/add.log.component';
import { AlertsComponent } from './home/patients/viewalerts/view.alert.component';
import { AddTipComponent } from './home/patients/viewpatientinfo/viewtips/add.tip.component';
import { DashboardComponent } from './home/dashboard/dashboard.component';
import { ViewCommentComponent } from './home/dashboard/comment.component';
import { InfoPatientComponent } from './home/patients/patient.info.component';
import { SendAlertComponent } from './home/alerts/send.alert.component';
import { VideoComponent } from './home/patients/infovideo/video.component';
import { VideoInfoComponent } from './home/patients/infovideo/video.info.component';
import { InfoVideoComponent } from './home/dashboard/info.video.component';
import { VideosComponent } from './home/dashboard/videos.component';

import { NgxYoutubePlayerModule } from 'ngx-youtube-player';
import { PlayVideoComponent } from './home/dashboard/play.video.component';
import { CheckSymptomsComponent } from './home/checksymptoms/check.symptoms.component';

@NgModule({
  declarations: [
    AppComponent,
    AuthenticationComponent,
    HomeComponent,
    SignupComponent,
    SigninComponent,
    PatientsComponent,
    CourseComponent,
    ViewPatientComponent,
    InfoPatientComponent,
    ViewLogComponent,
    AddLogComponent,
    AlertsComponent,
    AddTipComponent,
    DashboardComponent,
    ViewCommentComponent,
    SendAlertComponent,
    VideoComponent,
    VideoInfoComponent,
    InfoVideoComponent,
    VideosComponent,
    PlayVideoComponent,
    CheckSymptomsComponent
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpModule,
    ReactiveFormsModule,
    NoopAnimationsModule,
    MatTabsModule,
    NgxYoutubePlayerModule.forRoot()
  ],
  providers: [SessionService, AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
