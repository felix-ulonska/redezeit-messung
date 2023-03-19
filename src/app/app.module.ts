import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RedezeitTableComponent } from './redezeit-table/redezeit-table.component';
import { RedezeitSideComponent } from './redezeit-side/redezeit-side.component';
import { PauseComponent } from './pause/pause.component';
import { DurationPipe } from './_pipes/duration.pipe';
import { StartDatePipe } from './_pipes/start-date.pipe';
import { HistoryComponent } from './history/history.component';
import { TypeRedezeitPipe } from './_pipes/type-redezeit.pipe';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { EditModalComponent } from './edit-modal/edit-modal.component';
import { ModalComponent } from './modal/modal.component';

@NgModule({
  declarations: [
    AppComponent,
    RedezeitTableComponent,
    RedezeitSideComponent,
    PauseComponent,
    DurationPipe,
    StartDatePipe,
    HistoryComponent,
    TypeRedezeitPipe,
    EditModalComponent,
    ModalComponent,
  ],
  imports: [BrowserModule, AppRoutingModule, BrowserAnimationsModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
