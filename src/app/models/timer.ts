import { TimerEdit } from "./timer-edit";

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
  actual_minutes: number;
  project_ext_id: string;
  project_ext_name: string;
  project_id: string;
  tz_offset: number;
  edits: [TimerEdit];

  constructor(data: any) {
    for (var key in data) {
      this[key] = data[key]
    }

    this.created_at = new Date(data.created_at);
    this.deleted_at = data.deleted_at ? new Date(data.deleted_at) : null;
    this.finished_at = data.finished_at ? new Date(data.finished_at) : null;
  }

  getMinutes() {
    if (this.finished_at != null) {
      return this.minutes;
    }else {
      let now = new Date();
      return Math.round((now.getTime() - this.created_at.getTime()) / (1000 * 60));
    }
  }
}

