export class TimerEdit {
  public minutes: number;
  public team_user_id: string;
  public created_at: Date;

  constructor(minutes, userID, created_at = new(Date)) {
    this.minutes = minutes;
    this.team_user_id = userID;
    this.created_at = created_at;
  }
}
