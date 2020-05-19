import Scratchpad from './Scratchpad';
import Item from './Item';

export default interface StorageService {
  createScratchpad(name: string): Promise<string>;
  loadScratchpad(id: string): Promise<Scratchpad>;
  removeScratchpad(id: string): Promise<void>;

  addItem(id: string, content: string): Promise<Item>;
  removeItem(id: string, itemId: number): Promise<void>;
  modifyItem(id: string, itemId: number, content: string): Promise<void>;

  getIds(): string[];
}
