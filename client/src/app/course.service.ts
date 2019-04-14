import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import { Course } from './course';
import { GlobalVariable } from './globals';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class CourseService {

  constructor(private http: Http) { }

  getCourses(){
    return this.http.get(`${environment.url}`+'api/courses').map(res => res.json());
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
