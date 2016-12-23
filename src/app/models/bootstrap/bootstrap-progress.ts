import { BootstrapItem } from './bootstrap-item';

export class BootstrapProgress {

  constructor(private items: BootstrapItem[]) {}

  isCompleted() {
    for (let item of this.items) {
      if (!item.isLoaded()) {
        return false;
      }
    }
    return true;
  }
}
