import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { ScratchpadComponent } from './scratchpad/scratchpad.component';
import { LocalStorageService } from './service/local-storage.service';
import { ResizeDirective } from './resize.directive';
import { RemoteStorageService } from './service/remote-storage.service';

@NgModule({
  declarations: [
    AppComponent,
    ScratchpadComponent,
    ResizeDirective
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [LocalStorageService, RemoteStorageService],
  bootstrap: [AppComponent]
})
export class AppModule { }
