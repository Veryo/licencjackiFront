import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AlpacaListComponent } from './alpaca-list/alpaca-list/alpaca-list.component';
import { AppComponent } from './app.component';
const routes: Routes = [
  {path: '',component: AppComponent},
  {path: 'alpaca-list',component: AlpacaListComponent},
  { path: '**', redirectTo: '' } 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
