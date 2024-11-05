import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AlpacaListComponent } from './alpaca-list/alpaca-list/alpaca-list.component';
import { AppComponent } from './app.component';
import { AlpacaDetailComponent } from './alpaca-detail/alpaca-detail/alpaca-detail.component';
const routes: Routes = [
  {path: 'alpaca-list',component: AlpacaListComponent},
  { path: 'alpaca-detail/:id', component: AlpacaDetailComponent },
  { path: '**', redirectTo: 'alpaca-list' } 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
