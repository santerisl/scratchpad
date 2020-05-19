import { Component, OnInit } from '@angular/core';
import { LocalStorageService } from './service/local-storage.service';
import { RemoteStorageService } from './service/remote-storage.service';
import StorageService from './StorageService';
import ScratchpadView from './ScratchpadView';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'scratchpad';

  scratchpadNameInput: string;
  remoteInput: boolean;
  scratchpadPasswordInput: string;

  scratchpadIdInput: string;

  scratchpadViews: ScratchpadView[];

  constructor(
    public lsService: LocalStorageService,
    public rsService: RemoteStorageService) {}

  ngOnInit() {
    this.scratchpadViews = [
      ...this.lsService.getIds(),
      ...this.rsService.getIds()
    ];
  }

  addScratchpad() {
    const storage: StorageService = this.remoteInput ? this.rsService : this.lsService;
    const auth = this.inputSecured() ? this.scratchpadPasswordInput : null;

    storage.createScratchpad(this.scratchpadNameInput, auth)
      .then((id: string) => this.scratchpadViews.push({
        id, auth, remote: this.remoteInput
      }))
      .catch(error => console.error('Add', error));
    this.scratchpadNameInput = '';
    this.scratchpadPasswordInput = '';
  }

  inputSecured() {
    return this.scratchpadPasswordInput
      && this.scratchpadPasswordInput.length > 0;
  }

  addId() {
    this.scratchpadViews.push({id: this.scratchpadIdInput, remote: true});
    this.rsService.addId(this.scratchpadIdInput);
    this.scratchpadIdInput = '';
  }

  removeScratchpad(removedScratchpadId: string) {
    this.scratchpadViews = this.scratchpadViews.filter(
      scratchpadId => scratchpadId.id !== removedScratchpadId);
    this.rsService.removeId(removedScratchpadId);
  }
}
