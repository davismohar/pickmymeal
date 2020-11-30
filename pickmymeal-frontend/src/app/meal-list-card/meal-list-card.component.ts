import { Component, OnInit, Input } from '@angular/core';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import {MatChipInputEvent} from '@angular/material/chips';
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
  personalFoods: String[] = ['Burger', 'Pizza', 'Salad', 'Pancakes', 'Wings']
  communityFoods: String[] = ['Steak', 'Eggs', 'Bacon', 'Toast', 'Waffles']
  foods: String[];
  constructor() {}

  ngOnInit(): void {
    if (this.listType === 'Personal') {
      this.foods = this.personalFoods;
    }
    else {
      this.foods = this.communityFoods;
    }
  }

  pickMeal() {
    alert("We have picked " + this.foods[Math.floor(Math.random()*this.foods.length)])
  }

  add(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;

    // Add our fruit
    if ((value || '').trim()) {
      this.foods.push(value.trim());
    }

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
  }

}
