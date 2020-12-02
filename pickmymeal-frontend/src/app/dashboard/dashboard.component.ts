import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA} from '@angular/material';
import { MealList } from '../_models/mealList';
import { MealListService } from '../_services';
import { FoodNotificationComponent } from '../food-notification/food-notification.component'


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  totalList = [];
  constructor(private mealListService: MealListService,
    private dialog: MatDialog) { }

  ngOnInit(): void {
    this
    this.mealListService.getCommunityList().subscribe(
      (list: MealList) => {this.totalList.push(...list.foods);}
    )
    this.mealListService.getPersonalList().subscribe(
      (list: MealList) => {
        this.totalList.push(...list.foods);
        console.log(this.totalList);
      }
    )
  }

  pickMeal() {
    const food = this.totalList[Math.floor(Math.random()*this.totalList.length)];
    this.dialog.open(FoodNotificationComponent, {
      data: {name: food}
    });
  }

}