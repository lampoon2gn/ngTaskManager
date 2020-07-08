import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { TaskComponent } from './task/task.component';
import { upsertComponent } from './upsert/upsert.component';
import { RegisterComponent } from './register/register.component';
import {MyGuardGuard} from './my-guard.guard'


const routes: Routes = [
  //{ path: '', pathMatch: 'full', redirectTo: '/login' },
  { path: 'login', pathMatch: 'full', component:LoginComponent},
  { path: 'task', pathMatch: 'full', component:TaskComponent,canActivate:[MyGuardGuard]},
  { path: 'register', pathMatch: 'full', component:RegisterComponent},
  { path: '**', redirectTo:'/login',pathMatch: 'full'},
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

