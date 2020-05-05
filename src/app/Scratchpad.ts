import Item from './Item';

export default interface Scratchpad {
  id: number;
  itemCount: any;
  name: string;
  items: Array<Item>;
  active?: boolean;
}
