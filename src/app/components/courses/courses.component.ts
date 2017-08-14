import { Component, OnInit } from '@angular/core';
import { CourseService } from '../../services/course.service';
import { Course, Prerequisite } from '../../models/Course';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.css']
})
export class CoursesComponent implements OnInit {
  
  courses: Array<Course> = [];

  constructor(
    public courseService: CourseService
  ) { }

  ngOnInit() {
    this.courseService.getCourses().subscribe(
      courses => {
        this.courses = courses;
        for(let i = 0; i < this.courses.length; i++) {
          if(!this.courses[i].prerequisites) {
            this.courses[i].prerequisites = [];
          }
        }
        console.log(this.courses);
      }
    )
  }

}
