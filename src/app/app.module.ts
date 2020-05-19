import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { ScratchpadComponent } from './scratchpad/scratchpad.component';
import { ItemComponent } from './scratchpad/item.component';
import { LocalStorageService } from './service/local-storage.service';
import { RemoteStorageService } from './service/remote-storage.service';
import { PopupComponent } from './popup/popup.component';

@NgModule({
  declarations: [
    AppComponent,
    ScratchpadComponent,
    ItemComponent,
    PopupComponent,
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
