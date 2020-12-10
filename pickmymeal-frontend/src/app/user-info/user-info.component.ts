import { Component, OnInit } from '@angular/core';
import { User } from '../_models/user';
import {Role} from '../_models/role';
import { AuthService } from '../_services/auth.service';

@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.css']
})
export class UserInfoComponent implements OnInit {
  currentUser: User;
  constructor(private authService: AuthService,) { }

  ngOnInit(): void {
    this.currentUser = this.authService.currentUserValue;
  }

  get isAdmin() {
    return this.currentUser && this.currentUser.role === Role.admin;
  }


}
