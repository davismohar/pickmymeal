import { Component, OnInit, Input } from '@angular/core';

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

}
