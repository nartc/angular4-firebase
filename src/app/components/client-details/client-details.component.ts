import { Component, OnInit } from '@angular/core';
import { ClientService } from '../../services/client.service';
import { Client } from '../../models/Client';
import { FlashMessagesService} from 'angular2-flash-messages';
import { Router, ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-client-details',
  templateUrl: './client-details.component.html',
  styleUrls: ['./client-details.component.css']
})
export class ClientDetailsComponent implements OnInit {
  
  id: string='';
  client: Client;
  hasBalance: boolean = false;
  showBalanceUpdateInput: boolean = false;

  constructor(
    public flashMessages: FlashMessagesService,
    public clientService: ClientService,
    public router: Router,
    public aRoute: ActivatedRoute
  ) { }

  ngOnInit() {
    // Get ID from URL
    this.id = this.aRoute.snapshot.params['id'];

    //Get Client from ID
    this.clientService.getClientById(this.id).subscribe(
      client => {
        if(client.balance > 0) {
          this.hasBalance = true;
        }
        this.client = client;
      }
    );
  }

  updateBalance(id: string) {
    // Update Client
    this.clientService.updateClient(this.id, this.client);
    this.flashMessages.show(
      'Balance Updated',
      {
        cssClass: 'alert-success',
        timeout: 3000
      }
    );
    this.router.navigate(['/client/'+this.id]);
    this.showBalanceUpdateInput = false;
  }

  onDeleteClick() {
    if(confirm("Are you sure to delete?")) {
      this.clientService.deleteClient(this.id);
    }
    this.flashMessages.show(
      'Client Deleted',
      {
        cssClass: 'alert-danger',
        timeout: 3000
      }
    );
    this.router.navigate(['/']);
  }

}
