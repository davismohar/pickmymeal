import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../_models/user';

@Injectable({ providedIn: 'root' })
export class UserService {
    constructor(private http: HttpClient){}

    // Register a new user
    register(user: User) {
        return this.http.post(`http://localhost:4000/api/user/register`, user);
      }
    
    // Get all users
    getAll() {
      console.log('getAll()');
      return this.http.get<User[]>(`http://localhost:4000/api/user/allusers`);
    }
    
    
}