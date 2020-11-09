import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CondensedListCardComponent } from './condensed-list-card/condensed-list-card.component';
import { ActionCardComponent } from './action-card/action-card.component';
import { MealListCardComponent } from './meal-list-card/meal-list-card.component';
import { ToolbarComponent } from './toolbar/toolbar.component';
import { UserInfoComponent } from './user-info/user-info.component';

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
    UserInfoComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
