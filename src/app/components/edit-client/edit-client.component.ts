import { Component, OnInit } from '@angular/core';
import { ClientService } from '../../services/client.service';
import { Client } from '../../models/Client';
import { FlashMessagesService} from 'angular2-flash-messages';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { SettingsService } from '../../services/settings.service';

@Component({
  selector: 'app-edit-client',
  templateUrl: './edit-client.component.html',
  styleUrls: ['./edit-client.component.css']
})
export class EditClientComponent implements OnInit {
  id: string = '';
  client: Client = {
    firstName: '',
    lastName: '',
    phone: '',
    email: '',
    balance: 0
  }

  disableBalanceOnEdit: boolean = true;

  constructor(
    public flashMessages: FlashMessagesService,
    public clientService: ClientService,
    public router: Router,
    public aRoute: ActivatedRoute, 
    public settingsService: SettingsService
  ) { }

  ngOnInit() {
    //Get ID
    this.id = this.aRoute.snapshot.params['id'];

    //Get Client by ID
    this.clientService.getClientById(this.id).subscribe(
      client => {
        this.client = client;
      }
    );

    this.disableBalanceOnEdit = this.settingsService.getSettings().disableBalanceOnEdit;
  }

  onSubmit({value, valid}: {value: Client, valid: boolean}) {
      if(!valid) {
        this.flashMessages.show(
          'Please fill out all fields.',
          {
            cssClass:'alert-danger',
            timeout: 3000
          }
        );
        this.router.navigate(['edit-client/'+this.id]);
      } else {
        //Update Client
        this.clientService.updateClient(this.id, value);
        this.flashMessages.show(
          'Client Updated',
          {
            cssClass:'alert-success',
            timeout: 3000
          }
        );
        this.router.navigate(['/client/'+this.id]);
      } 
  }

}
