import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import {MaterialModule} from './material-module';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';
import {JwtInterceptor} from './_interceptors/jwt.interceptor';
import {ErrorInterceptor} from './_interceptors/error.interceptor';

// Our created components
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CondensedListCardComponent } from './condensed-list-card/condensed-list-card.component';
import { ActionCardComponent } from './action-card/action-card.component';
import { MealListCardComponent } from './meal-list-card/meal-list-card.component';
import { ToolbarComponent } from './toolbar/toolbar.component';
import { UserInfoComponent } from './user-info/user-info.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { GenerateMealComponent } from './generate-meal/generate-meal.component';
import { CommunityListComponent } from './community-list/community-list.component';
import { PersonalListComponent } from './personal-list/personal-list.component';
import { RegisteredUsersComponent } from './registered-users/registered-users.component';
import { FoodNotificationComponent } from './food-notification/food-notification.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    DashboardComponent,
    CondensedListCardComponent,
    ActionCardComponent,
    MealListCardComponent,
    ToolbarComponent,
    UserInfoComponent,
    PageNotFoundComponent,
    GenerateMealComponent,
    CommunityListComponent,
    PersonalListComponent,
    RegisteredUsersComponent,
    FoodNotificationComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MaterialModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true }],
  entryComponents: [FoodNotificationComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
