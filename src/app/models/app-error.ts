export class AppError {
  public errStatus: number;
  public userMessage: string;
  public developerMessage: string;

  constructor(errStatus, userMessage = null, developerMessage = null) {
    this.errStatus = errStatus;
    this.userMessage = userMessage;
    this.developerMessage = developerMessage;
  }
}
