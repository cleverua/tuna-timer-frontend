export class Timer {
  id: string;
  task_name: string;
  task_hash: string;
  team_id: string;
  team_user_id: string;
  created_at: Date;
  finished_at: Date;
  deleted_at: Date;
  minutes: number;
  project_ext_id: string;
  project_ext_name: string;
  project_id: string;
  tz_offset: number;

  constructor(data: any) {
    this.id = data.id;
    this.task_name = data.task_name;
    this.team_user_id = data.team_user_id;
    this.project_ext_id = data.project_ext_id;
    this.created_at = new Date(data.created_at);
    this.deleted_at = data.deleted_at ? new Date(data.deleted_at) : null;
    this.finished_at = data.finished_at ? new Date(data.finished_at) : null;
    this.minutes = data.minutes;
    this.project_ext_name = data.project_ext_name;
    this.project_id = data.project_id;
    this.task_hash = data.task_hash;
    this.team_id = data.team_id;
    this.tz_offset = data.tz_offset;
  }

  getMinutes() {
    if (this.finished_at != null) {
      return this.minutes;
    }else {
      let now = new Date();
      return Math.round((now.getTime() - this.created_at.getTime()) / (1000 * 60));
    }
  }

  minToHours(): string {
    let hours = Math.floor(this.getMinutes() / 60);
    let minutes = (this.getMinutes() % 60).toString();

    if (minutes.length < 2) {
      minutes = `0${minutes}`;
    }

    return `${hours}:${minutes}`
  }
}

