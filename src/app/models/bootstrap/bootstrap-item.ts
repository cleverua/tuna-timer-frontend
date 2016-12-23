export class BootstrapItem {
  static STATUS_LOADING: string = 'LOADING';
  static STATUS_LOADED: string = 'DONE';

  constructor(public name: string, private status: string = "", private error: string = "") { }

  getName() {
    return this.name;
  }

  isLoading() {
    return this.status === BootstrapItem.STATUS_LOADING;
  }

  isLoaded() {
    return this.status === BootstrapItem.STATUS_LOADED;
  }

  setLoading() {
    this.status = BootstrapItem.STATUS_LOADING;
  }

  setLoaded() {
    this.status = BootstrapItem.STATUS_LOADED;
  }
}
