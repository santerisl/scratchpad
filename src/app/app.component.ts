import { Component, OnInit } from '@angular/core';
import { LocalStorageService } from './service/local-storage.service';
import { RemoteStorageService } from './service/remote-storage.service';
import StorageService from './StorageService';

interface ScratchpadId {
  id: string;
  remote: boolean;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'scratchpad';

  scratchpadNameInput: string;
  remoteInput: boolean;

  scratchpadIdInput: string;

  scratchpadIds: ScratchpadId[];
  // localIds: string[];
  // remoteIds: string[];

  constructor(
    public lsService: LocalStorageService,
    public rsService: RemoteStorageService) {}

  ngOnInit() {
    this.scratchpadIds = [
      ...this.lsService.getIds().map(id => ({id, remote: false})),
      ...this.rsService.getIds().map(id => ({id, remote: true}))
    ];
  }

  addScratchpad() {
    const storage: StorageService = this.remoteInput ? this.rsService : this.lsService;
    storage.createScratchpad(this.scratchpadNameInput)
      .then((id: string) => this.scratchpadIds.push({id, remote: this.remoteInput}))
      .catch(error => console.error('Add', error));
    this.scratchpadNameInput = '';
  }

  addId() {
    this.scratchpadIds.push({id: this.scratchpadIdInput, remote: true});
    this.lsService.setItem('remoteIds', [
      ...this.rsService.getIds(), this.scratchpadIdInput
    ]);
    this.scratchpadIdInput = '';
  }

  removeScratchpad(removedScratchpadId: string) {
    this.scratchpadIds = this.scratchpadIds.filter(
      scratchpadId => scratchpadId.id !== removedScratchpadId);
    this.rsService.removeId(removedScratchpadId);
  }
}
