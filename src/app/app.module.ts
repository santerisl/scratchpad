import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { ScratchpadComponent } from './scratchpad/scratchpad.component';
import { LocalStorageService } from './local-storage.service';
import { ResizeDirective } from './resize.directive';

@NgModule({
  declarations: [
    AppComponent,
    ScratchpadComponent,
    ResizeDirective
  ],
  imports: [
    BrowserModule,
    FormsModule
  ],
  providers: [LocalStorageService],
  bootstrap: [AppComponent]
})
export class AppModule { }
