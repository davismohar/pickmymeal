import { Component, OnInit } from '@angular/core';
import { User } from '../_models/user';
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
    console.log("user is")
    console.log(this.currentUser.username);
  }

}
