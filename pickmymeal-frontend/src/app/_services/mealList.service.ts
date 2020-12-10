import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {BehaviorSubject,  Observable} from 'rxjs';
import { map } from 'rxjs/operators';
import {MealList} from '../_models/mealList';
import {AuthService} from './auth.service';

// import { User } from '../_models/user';

@Injectable({ providedIn: 'root' })
export class MealListService {

    constructor(private http: HttpClient, private authService: AuthService) {

    }

    getCommunityList(){
        return this.http.get('http://localhost:4000/api/foodlist/getlist?username=admin');
    }

    getSuggestedList(){
        return this.http.get('http://localhost:4000/api/foodlist/getlist?username=suggested');
    }

    getPersonalList() {
        const username = this.authService.currentUserValue.username;
        return this.http.get('http://localhost:4000/api/foodlist/getlist?username=' + username);
    }

    updateList(newList) {
        console.log("update list to " + newList);
        const username = this.authService.currentUserValue.username;
        const list = {ownerUsername: username, foods: newList};
        console.log(list);
        return this.http.post('http://localhost:4000/api/foodlist/updatelist', list);
    }

    updateCommunityList(newList) {
        console.log("update list to " + newList);
        const list = {ownerUsername: 'admin', foods: newList};
        console.log(list);
        return this.http.post('http://localhost:4000/api/foodlist/updatelist', list);
    }

    updateSuggestedList(newList) {
        console.log("update list to " + newList);
        const list = {ownerUsername: 'suggested', foods: newList};
        console.log(list);
        return this.http.post('http://localhost:4000/api/foodlist/updatelist', list);
    }
    
}