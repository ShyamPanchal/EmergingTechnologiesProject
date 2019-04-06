import { Component, OnInit } from '@angular/core';
import { GlobalVariable } from '../globals';
import { Router } from "@angular/router";
import { Student } from '../student';
import { Course } from '../course';
import { CourseService } from '../course.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  courseList: Course[] = [];

  selectedCourse: Course;

  submitted: boolean = false;

  toogleForm: boolean = false;
  addCourseVisible: boolean = false;

  addCourseForm: FormGroup;

  student: Student;

  constructor(private formBuilder: FormBuilder, private router: Router, private courseService: CourseService) {

    this.addCourseForm = this.formBuilder.group({
      courseName: ['', Validators.required],
      courseCode: ['', Validators.required],
      section: ['', Validators.required],
      semester: ['', Validators.required],
    });

  }
  get f() { return this.addCourseForm.controls; }

  getCourses() {

    this.courseService.getCourses().subscribe(courses => {
      this.courseList = courses;
    });
    console.log("course list: ");
    console.log(this.courseList);
  }

  ngOnInit() {
    if (!(GlobalVariable.student._id)) {
      console.log('no user found !');
      this.router.navigate(['/']);
    }
    this.getCourses();
    this.student = GlobalVariable.student;
  }

  showEditForm(course) {
    this.selectedCourse = course;
    this.toogleForm = !this.toogleForm;

    this.addCourseForm.controls['courseName'].setValue(course.courseName);
    this.addCourseForm.controls['courseCode'].setValue(course.courseCode);
    this.addCourseForm.controls['section'].setValue(course.section);
    this.addCourseForm.controls['semester'].setValue(course.semester);

    this.addCourseVisible = true;
  }

  cancelEdit() {
    this.selectedCourse = null;
    this.toogleForm = !this.toogleForm;
  }

  deleteItem(id) {
    console.log(id);
    this.courseService.deleteItem(id).subscribe(data => {
      this.getCourses();
    });
    if (this.toogleForm) {
      this.submitted = false;
      this.addCourseForm.reset();
    }
  }

  toggleAddCourse() {
    this.addCourseVisible = !this.addCourseVisible;
  }

  addCourse() {
    this.submitted = true;

    let newCourse: Course = {
      courseName: this.addCourseForm.value.courseName,
      courseCode: this.addCourseForm.value.courseCode,
      section: this.addCourseForm.value.section,
      semester: this.addCourseForm.value.semester
    };
    this.courseService.addCourse(newCourse).subscribe(item => {
      console.log(item);
      this.getCourses();
    });

    this.submitted = false;
    this.addCourseForm.reset();
  }

  editCourse() {

    this.submitted = true;

    let newCourse: Course = {
      courseName: this.addCourseForm.value.courseName,
      courseCode: this.addCourseForm.value.courseCode,
      section: this.addCourseForm.value.section,
      semester: this.addCourseForm.value.semester,
      _id: this.selectedCourse._id,
      creator: this.selectedCourse.creator
    };

    console.log(newCourse);

    this.courseService.updateCourse(newCourse).subscribe(item => {
      console.log(item);
      this.getCourses();
      this.toogleForm = !this.toogleForm;
    });

    this.submitted = false;
    this.addCourseForm.reset();
  }
}
