import { Component, OnInit } from '@angular/core';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  
  email: string = '';
  password: string = '';

  constructor(
    public flashMessages: FlashMessagesService,
    public router: Router,
    public authService: AuthService
  ) { }

  ngOnInit() {
  }

  onSubmit() {
    this.authService.registerUser(this.email, this.password)
      .then((res) => {
        this.flashMessages.show(
          'New User Registered',
          {
            cssClass: 'alert-success',
            timeout: 3000
          }
        );
        this.router.navigate(['/login']);
      })
      .catch((err) => {
        this.flashMessages.show(
          err.message,
          {
            cssClass: 'alert-danger',
            timeout: 3000
          }
        );
        this.router.navigate(['/register']);
      })
    
  }

}
