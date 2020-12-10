import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {AuthService} from './auth.service';

@Injectable({ providedIn: 'root' })
export class MealListService {

    constructor(private http: HttpClient, private authService: AuthService) {}

    // Get shared list
    getCommunityList(){
        return this.http.get('http://localhost:4000/api/foodlist/getlist?username=admin');
    }

    // Get list of suggestings (only editable by admin)
    getSuggestedList(){
        return this.http.get('http://localhost:4000/api/foodlist/getlist?username=suggested');
    }

    // Get list of current user
    getPersonalList() {
        const username = this.authService.currentUserValue.username;
        return this.http.get('http://localhost:4000/api/foodlist/getlist?username=' + username);
    }

    // Update personal list
    updateList(newList) {
        const username = this.authService.currentUserValue.username;
        const list = {ownerUsername: username, foods: newList};
        return this.http.post('http://localhost:4000/api/foodlist/updatelist', list);
    }

    // Update shared list
    updateCommunityList(newList) {
        const list = {ownerUsername: 'admin', foods: newList};
        return this.http.post('http://localhost:4000/api/foodlist/updatelist', list);
    }

    // Update list of suggestions
    updateSuggestedList(newList) {
        const list = {ownerUsername: 'suggested', foods: newList};
        return this.http.post('http://localhost:4000/api/foodlist/updatelist', list);
    }
    
}