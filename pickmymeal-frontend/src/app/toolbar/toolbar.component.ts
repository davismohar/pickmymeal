import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../_services/auth.service';
import { User } from '../_models/user';
import { Role } from '../_models/role';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css']
})

// Toolbar view (shown above all views)
export class ToolbarComponent implements OnInit {
  currentUser: User;

  constructor(private router: Router,
    private authService: AuthService,
  ) {
    
    this.authService.currentUser.subscribe(x => {
      this.currentUser = x;
      console.log(this.currentUser);
    });
  }

  ngOnInit() {

  }

  get isAdmin() {
    return this.currentUser && this.currentUser.role === Role.admin;
  }

  get isUser() {
    return this.currentUser;
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

}
