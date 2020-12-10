import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA} from '@angular/material';
import { AuthService } from '../_services/auth.service';
import { MealList } from '../_models/mealList';
import { MealListService } from '../_services';
import { User } from '../_models/user';
import { Role } from '../_models/role';
import { FoodNotificationComponent } from '../food-notification/food-notification.component'


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})

// Main dashboard view
export class DashboardComponent implements OnInit {
  totalList = [];
  currentUser: User;
  
  // Init class
  constructor(private mealListService: MealListService,
    private dialog: MatDialog, private authService: AuthService) { 
      this.authService.currentUser.subscribe(x => {
        this.currentUser = x;
      });
    }

  // Obtain all foods for selection
  ngOnInit(): void {
    this.mealListService.getCommunityList().subscribe(
      (list: MealList) => {this.totalList.push(...list.foods);}
    )
    this.mealListService.getPersonalList().subscribe(
      (list: MealList) => {
        this.totalList.push(...list.foods);
      }
    )
  }

  // Pick a meal from both personal and community lists
  pickMeal() {
    const food = this.totalList[Math.floor(Math.random()*this.totalList.length)];
    this.dialog.open(FoodNotificationComponent, {
      data: {name: food}
    });
  }

  // Determine if current user is admin
  get isAdmin() {
    return this.currentUser && this.currentUser.role === Role.admin;
  }

}