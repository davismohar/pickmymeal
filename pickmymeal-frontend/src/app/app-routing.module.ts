import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuard } from './_guards/auth.guard'

import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component'
import { UserInfoComponent } from './user-info/user-info.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component'
import { GenerateMealComponent } from './generate-meal/generate-meal.component';
import { MealListCardComponent } from './meal-list-card/meal-list-card.component';
import { RegisterComponent } from './register/register.component';
import { CommunityListComponent } from './community-list/community-list.component';
import { PersonalListComponent } from './personal-list/personal-list.component';
import { RegisteredUsersComponent } from './registered-users/registered-users.component';
import { SubmitFoodComponent } from './submit-food/submit-food.component';

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent
  },
  { path: 'register',
    component: RegisterComponent
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'user',
    component: UserInfoComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'generateMeal',
    component: GenerateMealComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'mealList',
    component: PersonalListComponent,
    canActivate: [AuthGuard]
  },
  { path: 'communityList',
    component: CommunityListComponent,
    canActivate: [AuthGuard]
  },
  { path: 'submitFood',
    component: SubmitFoodComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'admin',
    component: RegisteredUsersComponent,
    canActivate: [AuthGuard]
  },
  { path: '',   redirectTo: '/dashboard', pathMatch: 'full' },
  {path: '**', component: PageNotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
