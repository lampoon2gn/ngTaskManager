import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { TaskComponent } from './task/task.component';
import { upsertComponent } from './upsert/upsert.component';
import { RegisterComponent } from './register/register.component';


const routes: Routes = [
  //{ path: '', pathMatch: 'full', redirectTo: '/login' },
  { path: 'login', pathMatch: 'full', component:LoginComponent},
  { path: 'task', pathMatch: 'full', component:TaskComponent},
  { path: 'register', pathMatch: 'full', component:RegisterComponent},
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
