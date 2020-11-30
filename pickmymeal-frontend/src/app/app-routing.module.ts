import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuard } from './_guards/auth.guard'

import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component'
import { UserInfoComponent } from './user-info/user-info.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component'
import { GenerateMealComponent } from './generate-meal/generate-meal.component';
import { MealListCardComponent } from './meal-list-card/meal-list-card.component';

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent
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
    component: MealListCardComponent,
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
