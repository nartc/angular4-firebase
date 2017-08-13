import { Component, OnInit } from '@angular/core';
import { SettingsService } from '../../services/settings.service';
import { Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Settings } from '../../models/Settings';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {
  
  settings: Settings;

  constructor(
    public settingsService: SettingsService,
    public flashMessages: FlashMessagesService,
    public router: Router
  ) { }

  ngOnInit() {
    this.settings = this.settingsService.getSettings();
    console.log(this.settings);
  }

  onSubmit() {
    this.settingsService.saveSettings(this.settings);
    this.flashMessages.show(
      'Settings Saved',
      {
        cssClass: 'alert-success',
        timeout: 3000
      }
    );
    this.router.navigate(['/settings']);
  }

}
