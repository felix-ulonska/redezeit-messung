import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RedezeitTableComponent } from './redezeit-table/redezeit-table.component';
import { RedezeitSideComponent } from './redezeit-side/redezeit-side.component';
import { PauseComponent } from './pause/pause.component';
import { RedezeitenEntryComponent } from './redezeiten-entry/redezeiten-entry.component';

@NgModule({
  declarations: [
    AppComponent,
    RedezeitTableComponent,
    RedezeitSideComponent,
    PauseComponent,
    RedezeitenEntryComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
