export class BootstrapItem {
  static STATUS_LOADED: string = 'DONE';
  static STATUS_ERROR: string = 'ERROR';

  constructor(public name: string, private status: string = "", private error: string = "") { }

  getName() {
    return this.name;
  }

  isLoaded() {
    return this.status === BootstrapItem.STATUS_LOADED;
  }

  isErrored() {
    return this.status === BootstrapItem.STATUS_ERROR;
  }

  setLoaded() {
    this.status = BootstrapItem.STATUS_LOADED;
  }

  setErrored(errorMessage: string) {
    this.status = BootstrapItem.STATUS_ERROR;
    this.error = errorMessage;
  }

  getErrorMessage() {
    return this.error;
  }
}
