export class Timer {
  private id: string;
  private taskName: string;
  private taskHash: string;
  private teamID: string;
  private teamUserID: string;
  private createdAt: Date;
  private finishedAt: Date;
  private deletedAt: Date;
  private minutes: number;
  private projectExtID: string;
  private projectExtName: string;
  private projectID: string;
  private tzOffset: number;

  constructor(data: any) {
    this.id = data.id;
    this.taskName = data.task_name;
    this.teamUserID = data.team_user_id;
    this.projectExtID = data.project_ext_id;
    this.createdAt = data.created_at;
    this.deletedAt = data.deleted_at;
    this.finishedAt = data.finished_at;
    this.minutes = data.minutes;
    this.projectExtName = data.project_ext_name;
    this.projectID = data.project_id;
    this.taskHash = data.task_hash;
    this.teamID = data.team_id;
    this.tzOffset = data.tz_offset;
  }
}

