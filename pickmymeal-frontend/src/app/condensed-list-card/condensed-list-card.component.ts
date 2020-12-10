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

// Shows a single condensed list
export class CondensedListCardComponent implements OnInit {
  @Input() listType: string;
  personalFoods: String[] = ['Burger', 'Pizza', 'Salad', 'Pancakes', 'Wings']
  communityFoods: String[] = ['Steak', 'Eggs', 'Bacon', 'Toast', 'Waffles']
  currentUser: User;
  foods: String[];
  selectable = true;
  removable = true;

  // Initialize class
  constructor(private mealListService: MealListService,
    private dialog: MatDialog, private authService: AuthService) { 
      this.authService.currentUser.subscribe(x => {
        this.currentUser = x;
      });
    }

  // Obtain correct list from API
  ngOnInit(): void {
    if (this.listType === 'Personal') {
      this.mealListService.getPersonalList().subscribe(
        (list: MealList) => {
          if (!list) {
            this.foods = [];
          }
          else {
            this.foods = list.foods;
          }}
      );
    }
    else if (this.listType === 'Suggested') {
      this.mealListService.getSuggestedList().subscribe(
        (list: MealList) => {
          if (!list) {
            this.foods = [];
          }
          else {
            this.foods = list.foods;
          }}
      )
    }
    else {
      this.mealListService.getCommunityList().subscribe(
        (list: MealList) => {
          if (!list) {
            this.foods = [];
          }
          else {
            this.foods = list.foods;
          }}
      );
    }
  }

  // Pick a meal to show user
  pickMeal() {
    const food = this.foods[Math.floor(Math.random()*this.foods.length)];
    this.dialog.open(FoodNotificationComponent, {
      data: {name: food}
    });
  }

  // Determine if current user is an administrator
  get isAdmin() {
    return this.currentUser && this.currentUser.role === Role.admin;
  }

  // If list is suggested and user is admin, move from suggested to community
  clickAction(food: String) {
    if (this.isAdmin && this.listType === "Suggested") {
      const index: number = this.foods.indexOf(food);
      if (index !== -1) {
        this.foods.splice(index, 1);
        this.mealListService.updateSuggestedList(this.foods).subscribe();
      }
      let communityFoods: String[];
      this.mealListService.getCommunityList().subscribe(
        (list: MealList) => {
          if (!list) {
            communityFoods = [];
          }
          else {
            communityFoods = list.foods;
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

  // Remove a food from the current list
  remove(food: string): void {
    const index = this.foods.indexOf(food);
    if (index >= 0) {
      this.foods.splice(index, 1);
      this.mealListService.updateSuggestedList(this.foods).subscribe()
    }
  }
}
