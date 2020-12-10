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

// Form to submit new foods
export class SubmitFoodComponent implements OnInit {
  foodForm: FormGroup;
  submitted = false;

  // Init class
  constructor(
    private formBuilder: FormBuilder,
    private mealListService: MealListService,
    private router: Router
  ) { }

  // Create formbuilder 
  ngOnInit() {
    this.foodForm = this.formBuilder.group({
      foodName: ['', [Validators.required, Validators.pattern('[a-zA-Z ]*'), Validators.maxLength(25)]]
    })
  }

  // Get form controls
  get f() {
    return this.foodForm.controls; }
  
  // Submit food suggestion to backend
  onSubmit() {
    this.submitted = true;
    // Reject invalid suggestion
    if (this.foodForm.invalid) {
      console.log('Error in onSubmit()');
      return;
    }
    let foods: String[];
    // Submit to backend
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
