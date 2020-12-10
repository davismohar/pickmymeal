import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService, MealListService, UserService } from '../_services';
import {MealList} from '../_models/mealList';
import { first } from 'rxjs/operators';

import { NotificationService } from '../_services/notification.service';

@Component({
  selector: 'app-submit-food',
  templateUrl: './submit-food.component.html',
  styleUrls: ['./submit-food.component.css']
})
export class SubmitFoodComponent implements OnInit {
  foodForm: FormGroup;
  submitted = false;

  constructor(
    private formBuilder: FormBuilder,
    private mealListService: MealListService,
    private router: Router
  ) { }

  ngOnInit() {
    this.foodForm = this.formBuilder.group({
      foodName: ['', [Validators.required, Validators.pattern('[a-zA-Z ]*')]]
    })
  }

  get f() {
    return this.foodForm.controls; }
  
  onSubmit() {
    this.submitted = true;
    if (this.foodForm.invalid) {
      console.log('Error in onSubmit()');
      return;
    }
    let foods: String[];
    this.mealListService.getSuggestedList().subscribe(
      (list: MealList) => {
        if (!list) {
          foods = [];
        }
        else {
          foods = list.foods;
        }
        const newFood = this.foodForm.value;
        if ((newFood.foodName || '').trim()) {
          foods.push(newFood.foodName.trim());
        }
        this.mealListService.updateSuggestedList(foods).subscribe(
          () => {
            this.router.navigate(['/dashboard']);
          }
        );  
      }
    );
  }
}
