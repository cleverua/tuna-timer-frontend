export class Timer {
  id: string;
  taskName: string;
  taskHash: string;
  teamID: string;
  teamUserID: string;
  createdAt: Date;
  finishedAt: Date;
  deletedAt: Date;
  minutes: number;
  projectExtID: string;
  projectExtName: string;
  projectID: string;
  tzOffset: number;

  constructor(data: any) {
    this.id = data.id;
    this.taskName = data.task_name;
    this.teamUserID = data.team_user_id;
    this.projectExtID = data.project_ext_id;
    this.createdAt = new Date(data.created_at);
    this.deletedAt = data.deleted_at ? new Date(data.deleted_at) : null;
    this.finishedAt = data.finished_at ? new Date(data.finished_at) : null;
    this.minutes = data.minutes;
    this.projectExtName = data.project_ext_name;
    this.projectID = data.project_id;
    this.taskHash = data.task_hash;
    this.teamID = data.team_id;
    this.tzOffset = data.tz_offset;
  }

  minToHours(): string {
    let hours;
    let minutes;
    if (this.minutes) {
      hours = Math.floor(this.minutes / 60);
      minutes = (this.minutes % 60).toString();
    } else {
      let now = new Date();
      let min = (now.getTime() - this.createdAt.getTime()) / (1000 * 60);
      hours = Math.floor(min / 60);
      minutes = Math.round(min % 60).toString();
    }

    if (minutes.length < 2) {
      minutes = `0${minutes}`;
    }

    if (minutes == "60") {
      hours += 1;
      minutes = "00";
    }
    return `${hours}:${minutes}`
}
}

