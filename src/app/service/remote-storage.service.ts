import { Injectable } from '@angular/core';
import StorageService from '../StorageService';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import Scratchpad from '../Scratchpad';
import Item from '../Item';
import { LocalStorageService } from './local-storage.service';
import ScratchpadView from '../ScratchpadView';

@Injectable()
export class RemoteStorageService implements StorageService {

  constructor(private http: HttpClient, private lsService: LocalStorageService) {}

  async createScratchpad(name: string, auth?: string): Promise<string> {
    const sp = await this.http.post<Scratchpad>('/api/scratchpad', { name, auth }).toPromise();
    this.addId(sp.id, auth);
    return sp.id;
  }

  loadScratchpad(view: ScratchpadView): Promise<Scratchpad> {
    return this.http.get<Scratchpad>(
      `/api/scratchpad/${view.id}`,
      this.getHeader(view)).toPromise();
  }

  async removeScratchpad(view: ScratchpadView): Promise<void> {
    await this.http.delete<void>(
      `/api/scratchpad/${view.id}`,
      this.getHeader(view)).toPromise();
    return this.removeId(view.id);
  }

  addItem(view: ScratchpadView, content: string): Promise<Item> {
    return this.http.post<Item>(
      `/api/scratchpad/${view.id}/items`, {content},
      this.getHeader(view)).toPromise();
  }
  removeItem(view: ScratchpadView, itemId: number): Promise<void> {
    return this.http.delete<void>(
      `/api/scratchpad/${view.id}/items/${itemId}`,
      this.getHeader(view)).toPromise();
  }

  modifyItem(view: ScratchpadView, itemId: number, content: string): Promise<void> {
    return this.http.put<void>(
      `/api/scratchpad/${view.id}/items/${itemId}`, {content},
      this.getHeader(view)).toPromise();
  }

  public getIds(): ScratchpadView[] {
    return this.lsService.getItem('remoteIds', []) as ScratchpadView[];
  }

  public removeId(id: string) {
    this.lsService.setItem('remoteIds', this.getIds().filter(other => other.id !== id));
  }

  public addId(id: string, auth?: string) {
    const remoteId = {id, remote: true, auth};
    this.lsService.setItem('remoteIds', [...this.getIds(), remoteId]);
  }

  private getHeader(view: ScratchpadView) {
    if (view.auth) {
      return {
        headers: new HttpHeaders().set('Authorization', `${view.auth}`)
      };
    } else {
      return {};
    }
  }
}
