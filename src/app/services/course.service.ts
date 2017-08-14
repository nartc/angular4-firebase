import { Injectable } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database';
import { Observable } from 'rxjs';
import { Course, Prerequisite } from '../models/Course';

@Injectable()
export class CourseService {
  
  courses: FirebaseListObservable<Course[]>;
  course: FirebaseObjectObservable<Course>;

  constructor(
    public af: AngularFireDatabase
  ) {
    this.courses = this.af.list('/courses/classes') as FirebaseListObservable<Course[]>;
  }

  getCourses() {
    return this.courses;
  }

  getCourseById(id: string) {
    this.course = this.af.object('/courses/classes/'+id) as FirebaseObjectObservable<Course>;
    return this.course;
  }

  updateCourse(id: string, course: Course) {
    return this.courses.update(id, course);
  }

}
