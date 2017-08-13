import { Component, OnInit } from '@angular/core';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  
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
    this.authService.login(this.email, this.password)
    .then(
      (res) => {
        this.flashMessages.show(
          'You are logged in',
          {
            cssClass: 'alert-success',
            timeout: 3000
          }
        );
        this.router.navigate(['/']);
      }
    )
    .catch(
      (err) => {
        this.flashMessages.show(
          err.message,
          {
            cssClass: 'alert-danger',
            timeout: 3000
          }
        );
        this.router.navigate(['/login']);
      }
    )
  }

}
