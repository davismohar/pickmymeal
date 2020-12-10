import { Component, OnInit, Inject } from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';

@Component({
  selector: 'app-food-notification',
  templateUrl: './food-notification.component.html',
  styleUrls: ['./food-notification.component.css']
})

// Display selected food to the suer
export class FoodNotificationComponent implements OnInit {

  // Init class
  constructor(@Inject(MAT_DIALOG_DATA) public data: {name: string}) { }

  ngOnInit() {
  }

}
