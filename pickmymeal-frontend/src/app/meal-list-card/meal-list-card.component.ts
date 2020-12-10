import { Component, OnInit, Input, RootRenderer } from '@angular/core';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import {MatChipInputEvent} from '@angular/material/chips';
import { AuthService, MealListService, NotificationService, UserService } from '../_services';
import { MealList } from '../_models/mealList';
import { Role } from '../_models/role';
import { MatDialog } from '@angular/material';
import { FoodNotificationComponent } from '../food-notification/food-notification.component';
@Component({
  selector: 'app-meal-list-card',
  templateUrl: './meal-list-card.component.html',
  styleUrls: ['./meal-list-card.component.css']
})
export class MealListCardComponent implements OnInit {

  @Input() listType: string;
  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];
  personalFoods: String[] = ['empty list']
  communityFoods: String[] = ['empty list']
  foods: String[];
  mealList: MealList;
  constructor(private mealListService: MealListService,
    private authService: AuthService,
    private dialog: MatDialog,
    private notification: NotificationService) {}

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
          }}
      );
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

  get isAdmin(): boolean {
    return this.authService.currentUserValue.role == Role.admin;
  }

  pickMeal() {
    const food = this.foods[Math.floor(Math.random()*this.foods.length)];
    this.dialog.open(FoodNotificationComponent, {
      data: {name: food}
    });
  }

  add(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;
    if (value.length > 25) {
      this.notification.showNotif("Food must be less than 25 characters long")
      return;
    }
    // Add food
    if ((value || '').trim()) {
      this.foods.push(value.trim());
    }
    //Send updated list to backend
    if (this.listType === 'Personal')
      this.mealListService.updateList(this.foods).subscribe();
    else 
      this.mealListService.updateCommunityList(this.foods).subscribe();
    // Reset the input value
    if (input) {
      input.value = '';
    }
  }

  remove(food: string): void {
    const index = this.foods.indexOf(food);
    if (index >= 0) {
      this.foods.splice(index, 1);
    }
    if (this.listType === 'Personal')
      this.mealListService.updateList(this.foods).subscribe();
    else 
      this.mealListService.updateCommunityList(this.foods).subscribe();
  }

}
