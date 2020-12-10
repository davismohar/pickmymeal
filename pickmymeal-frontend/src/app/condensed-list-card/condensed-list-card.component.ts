import { Component, OnInit, Input } from '@angular/core';
import { MatDialog } from '@angular/material';
import { FoodNotificationComponent } from '../food-notification/food-notification.component';
import { MealList } from '../_models/mealList';
import { MealListService } from '../_services';
import { User } from '../_models/user';
import { Role } from '../_models/role';
import { AuthService } from '../_services/auth.service';

@Component({
  selector: 'app-condensed-list-card',
  templateUrl: './condensed-list-card.component.html',
  styleUrls: ['./condensed-list-card.component.css']
})
export class CondensedListCardComponent implements OnInit {
  @Input() listType: string;
  personalFoods: String[] = ['Burger', 'Pizza', 'Salad', 'Pancakes', 'Wings']
  communityFoods: String[] = ['Steak', 'Eggs', 'Bacon', 'Toast', 'Waffles']
  currentUser: User;
  foods: String[];
  constructor(private mealListService: MealListService,
    private dialog: MatDialog, private authService: AuthService) { 
      this.authService.currentUser.subscribe(x => {
        this.currentUser = x;
        console.log(this.currentUser);
        console.log("IS ADMIN" +this.currentUser.role)
      });
    }

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
    else if (this.listType === 'Suggested') {
      this.mealListService.getSuggestedList().subscribe(
        (list: MealList) => {
          console.log(list);
          if (!list) {
            this.foods = [];
          }
          else {
            this.foods = list.foods;
            console.log("loaded list of foods")
          }}
      )
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

  get isAdmin() {
    return this.currentUser && this.currentUser.role === Role.admin;
  }

  clickAction(food: String) {
    if (this.isAdmin && this.listType === "Suggested") {
      const index: number = this.foods.indexOf(food);
      if (index !== -1) {
        this.foods.splice(index, 1);
        this.mealListService.updateSuggestedList(this.foods).subscribe();
        console.log(this.foods);
      }
      let communityFoods: String[];
      this.mealListService.getCommunityList().subscribe(
        (list: MealList) => {
          console.log(list);
          if (!list) {
            communityFoods = [];
          }
          else {
            communityFoods = list.foods;
            console.log(communityFoods)
          }
          if ((food || '').trim()) {
            communityFoods.push(food.trim());
          }
          this.mealListService.updateCommunityList(communityFoods).subscribe(
            () => {
              window.location.reload();
            }
          );
          
        }
      );
    }
  }
}
