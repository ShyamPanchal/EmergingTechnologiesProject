import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import { Course } from './course';
import { GlobalVariable } from './globals';
import { environment } from 'src/environments/environment';
import { Log, Tip, Alert, VideoUrl } from './data';


@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http: Http) { }

  getFullName(id: string){
    return this.http.get(`${environment.url}`+'api/name/fullName/' + id).map(res => res.json());
  }

  getPatients(){
    return this.http.get(`${environment.url}`+'api/patients/getAll').map(res => res.json());
  }
  
  getLogs(patientId: string){
    return this.http.get(`${environment.url}`+'api/logs/' + patientId).map(res => res.json());
  }
  
  addLog(log: Log){
    let headers = new Headers();
    headers.append('Content-type','application/json');
    return this.http.post(`${environment.url}`+'api/logs/create',{log: log, user: GlobalVariable.user}, {headers: headers})
    .map(res => res.json());
  }

  addTip(tip: Tip){
    let headers = new Headers();
    headers.append('Content-type','application/json');
    return this.http.post(`${environment.url}`+'api/comments/create',{comment: tip, user: GlobalVariable.user}, {headers: headers})
    .map(res => res.json());
  }

  sendAlert(alert: Alert){
    let headers = new Headers();
    headers.append('Content-type','application/json');
    return this.http.post(`${environment.url}`+'api/alerts/create',{alert: alert, user: GlobalVariable.user}, {headers: headers})
    .map(res => res.json());
  }

  addVideo(video: VideoUrl){
    let headers = new Headers();
    headers.append('Content-type','application/json');
    return this.http.post(`${environment.url}`+'api/videos/create',{video: video, user: GlobalVariable.user}, {headers: headers})
    .map(res => res.json());
  }

  deleteVideo(id:string) {
    return this.http.delete(`${environment.url}`+'api/videos/' + id).map(res => res.json());
  }

  getVideos(){
    return this.http.get(`${environment.url}`+'api/videos/getAll').map(res => res.json());
  }

  updateVideo(video: VideoUrl){
    let headers = new Headers();
    headers.append('Content-type','application/json');
    return this.http.put(`${environment.url}`+'api/videos/'+video._id,{video: video, user: GlobalVariable.user}, { headers: headers})
    .map(res => res.json());
  }

  getAlerts(){
    return this.http.get(`${environment.url}`+'api/alerts/getAll').map(res => res.json());
  }

  dismissLog(id:string)  {
    return this.http.delete(`${environment.url}`+'api/logs/' + id).map(res => res.json());
  }

  dismissAlert(id:string)  {
    return this.http.delete(`${environment.url}`+'api/alerts/' + id).map(res => res.json());
  }

  dismissComment(id:string)  {
    return this.http.delete(`${environment.url}`+'api/comments/' + id).map(res => res.json());
  }

  getTips(patientId:string){
    return this.http.get(`${environment.url}`+'api/comments/getFor/' + patientId).map(res => res.json());
  }

  addCourse(course: Course){
    let headers = new Headers();
    headers.append('Content-type','application/json');
    return this.http.post(`${environment.url}`+'api/courses',{course: course, user: GlobalVariable.user}, {headers: headers})
    .map(res => res.json());
  }

  updateCourse(course){
    let headers = new Headers();
    headers.append('Content-type','application/json');
    return this.http.put(`${environment.url}`+'api/courses/'+course._id,{course: course, user: GlobalVariable.user}, { headers: headers})
    .map(res => res.json());
  }

  deleteItem(id){
    return this.http.delete(`${environment.url}`+'api/courses/'+id)
    .map(res => res.json());
  }  
}
