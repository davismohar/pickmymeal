import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../_services/auth.service';
import { NotificationService } from '../_services/notification.service';
import { User } from '../_models/user';
import { Role } from '../_models/role';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css']
})
export class ToolbarComponent implements OnInit {
  currentUser: User;

  constructor(private router: Router,
    private authService: AuthService,
    private notifService: NotificationService
  ) {
    this.authService.currentUser.subscribe(x => this.currentUser = x);
  }

  ngOnInit() {

  }

  get isAdmin() {
    return this.currentUser && this.currentUser.user.role === Role.admin;
  }

  get isUser() {
    return this.currentUser;
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

}
