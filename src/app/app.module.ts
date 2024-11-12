import { NgModule } from '@angular/core';
import {
  BrowserModule,
  provideClientHydration,
} from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCardModule } from '@angular/material/card';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { MatInputModule } from '@angular/material/input';
import { MatSidenavModule } from '@angular/material/sidenav';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatTabsModule } from '@angular/material/tabs';
import { MatTableModule } from '@angular/material/table';
import { MatDialogModule } from '@angular/material/dialog';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar/navbar.component';
import { AlpacaListComponent } from './alpaca-list/alpaca-list/alpaca-list.component';
import { AlpacaDetailComponent } from './alpaca-detail/alpaca-detail/alpaca-detail.component';
import { AlpacaWeightComponent } from './alpaca-detail/alpaca-weight/alpaca-weight/alpaca-weight.component';
import { AlpacaMedicationComponent } from './alpaca-detail/alpaca-medicaton/alpaca-medication/alpaca-medication.component';
import { AlpacaMedicationRecodComponent } from './alpaca-detail/alpaca-medicaton/alpaca-medication-recod/alpaca-medication-recod.component';
import { FormModule } from './forms/form.module';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    AlpacaListComponent,
    AlpacaDetailComponent,
    AlpacaWeightComponent,
    AlpacaMedicationComponent,
    AlpacaMedicationRecodComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatSidenavModule,
    MatListModule,
    MatButtonModule,
    MatToolbarModule,
    MatCardModule,
    ScrollingModule,
    MatInputModule,
    MatTabsModule,
    HttpClientModule,
    MatTableModule,
    MatDialogModule,
    FormsModule,
    ReactiveFormsModule,
    FormModule,
    MatMenuModule,
    MatIconModule,
  ],
  providers: [provideClientHydration(), provideAnimationsAsync()],
  bootstrap: [AppComponent],
})
export class AppModule {}
