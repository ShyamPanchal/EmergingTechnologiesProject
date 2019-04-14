import { Component, OnInit } from '@angular/core';
import { Course } from 'src/app/course';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { User } from 'src/app/user';
import { Router } from '@angular/router';
import { CourseService } from 'src/app/course.service';
import { DataService } from 'src/app/data.service';
import { AuthenticationService } from 'src/app/authentication.service';


@Component({
  selector: 'app-course',
  templateUrl: './course.component.html'
})
export class CourseComponent implements OnInit {

    courseList: Course[] = [];
    selectedCourse: Course;

    submitted: boolean = false;

    toogleForm: boolean = false;
    addCourseVisible: boolean = false;

    addCourseForm: FormGroup;

    user: User;
        
    constructor(private formBuilder: FormBuilder, 
        private router: Router, 
        private courseService: CourseService,         
        private authService: AuthenticationService) {

        this.addCourseForm = this.formBuilder.group({
        courseName: ['', Validators.required],
        courseCode: ['', Validators.required],
        section: ['', Validators.required],
        semester: ['', Validators.required],
        });

    }
    get f() { return this.addCourseForm.controls; }

    getCourses() {
/*
        this.courseService.getCourses().subscribe(courses => {
        this.courseList = courses;
        });
        console.log("course list: ");
        console.log(this.courseList);
        */
    }

    ngOnInit() {
        this.authService.currentUser.subscribe( user=> this.user = user);
        this.getCourses();        
    }

    logout() {
        this.authService.signOut();
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
