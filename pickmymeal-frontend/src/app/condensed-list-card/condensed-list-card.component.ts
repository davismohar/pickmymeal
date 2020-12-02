import { Component, OnInit, Input } from '@angular/core';
import { MatDialog } from '@angular/material';
import { FoodNotificationComponent } from '../food-notification/food-notification.component';
import { MealList } from '../_models/mealList';
import { MealListService } from '../_services';

@Component({
  selector: 'app-condensed-list-card',
  templateUrl: './condensed-list-card.component.html',
  styleUrls: ['./condensed-list-card.component.css']
})
export class CondensedListCardComponent implements OnInit {
  @Input() listType: string;
  personalFoods: String[] = ['Burger', 'Pizza', 'Salad', 'Pancakes', 'Wings']
  communityFoods: String[] = ['Steak', 'Eggs', 'Bacon', 'Toast', 'Waffles']
  foods: String[];
  constructor(private mealListService: MealListService, private dialog: MatDialog) {}

  ngOnInit(): void {
    if (this.listType === 'Personal') {
      this.mealListService.getPersonalList().subscribe(
        (list: MealList) => {
          console.log(list);
          if (!list) {
            this.foods = [];
          }
          else {
            this.foods = list.foods;
            console.log("loaded list of foods")
          }}
      );
    }
    else {
      this.mealListService.getCommunityList().subscribe(
        (list: MealList) => {
          console.log(list);
          if (!list) {
            this.foods = [];
          }
          else {
            this.foods = list.foods;
            console.log("loaded list of foods")
          }}
      );
    }
  }

  pickMeal() {
    const food = this.foods[Math.floor(Math.random()*this.foods.length)];
    this.dialog.open(FoodNotificationComponent, {
      data: {name: food}
    });
  }

}
