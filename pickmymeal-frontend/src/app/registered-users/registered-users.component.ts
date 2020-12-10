import { Component, OnInit } from '@angular/core';
import { User } from '../_models/user';
import { UserService } from '../_services';

@Component({
  selector: 'app-registered-users',
  templateUrl: './registered-users.component.html',
  styleUrls: ['./registered-users.component.css']
})

// Display list of all registered users
export class RegisteredUsersComponent implements OnInit {

  users: User[] = [];

  constructor(private userService: UserService) { }

  // Obtain users from backend service
  ngOnInit() {
    console.log('admin component');
    this.userService.getAll().subscribe(users => {
      this.users = users;
    });
  }


}
