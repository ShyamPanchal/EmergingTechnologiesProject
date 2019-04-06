import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import { Course } from './course';
import { GlobalVariable } from './globals';


@Injectable({
  providedIn: 'root'
})
export class CourseService {

  constructor(private http: Http) { }

  getCourses(){
    return this.http.get('http://localhost:1337/api/courses').map(res => res.json());
  }

  addCourse(course: Course){
    let headers = new Headers();
    headers.append('Content-type','application/json');
    return this.http.post('http://localhost:1337/api/courses',{course: course, user: GlobalVariable.student}, {headers: headers})
    .map(res => res.json());
  }

  updateCourse(course){
    let headers = new Headers();
    headers.append('Content-type','application/json');
    return this.http.put('http://localhost:1337/api/courses/'+course._id,{course: course, user: GlobalVariable.student}, { headers: headers})
    .map(res => res.json());
  }

  deleteItem(id){
    return this.http.delete('http://localhost:1337/api/courses/'+id)
    .map(res => res.json());
  }
}
