import { Component, OnInit } from '@angular/core';
import { CourseService } from '../../services/course.service';
import { Course, Prerequisite } from '../../models/Course';
import { FlashMessagesService} from 'angular2-flash-messages';
import { Router, ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-edit-course',
  templateUrl: './edit-course.component.html',
  styleUrls: ['./edit-course.component.css']
})
export class EditCourseComponent implements OnInit {
  
  id: string = '';
  courses: Array<Course>;
  course: Course = {
    creditHours: 0,
    identifier: {
       domain: '',
       full: '',
       number: ''
     },
    longDescription: '',
    name: '',
    prerequisites: [],
    shortDescription: ''
  }

  hasPrerequisite: boolean;

  constructor(
    public flashMessages: FlashMessagesService,
    public courseService: CourseService,
    public router: Router,
    public aRoute: ActivatedRoute
  ) { }

  ngOnInit() {
    //Get ID
    this.id = this.aRoute.snapshot.params['id'];

    //Get Course By ID
    this.courseService.getCourseById(this.id).subscribe(
      course => {
        this.course = course;
        if(this.course.prerequisites) {
          this.hasPrerequisite = true;
        } else {
          this.course.prerequisites = Array<Prerequisite>();
          this.hasPrerequisite = false;
        }
      }
    );

    //Get Courses
    this.courseService.getCourses().subscribe(
      courses => {
        this.courses = courses;
        this.courses.forEach(element => {
          if(!element.prerequisites) {
            element.prerequisites = Array<Prerequisite>();
          }
        });
      }
    );
  }

  onAddClick() {
    let prerequisite: Prerequisite;
    prerequisite = {
      identifier: '',
      canTakeConcurrently: false
    };

    for(let i = 0; i < this.courses.length; i++) {
      if(this.course.identifier.full == this.courses[i].identifier.full) {
        console.log(this.course.identifier.full == this.courses[i].identifier.full);
        this.course.prerequisites.push(prerequisite);
      }
    };
  }

  onSubmit({value, valid}: {value: Course, valid: boolean}) {
    console.log(value);
    if(!valid) {
      this.flashMessages.show(
          'Please fill out all fields.',
          {
            cssClass:'alert-danger',
            timeout: 3000
          }
        );
      this.router.navigate(['edit-course/'+this.id]);
    } else {
      //Update Course
      this.courseService.updateCourse(this.id, value);
      this.flashMessages.show(
          'Course Updated',
          {
            cssClass:'alert-success',
            timeout: 3000
          }
        );
        this.router.navigate(['/courses']);
    }
  }

}
