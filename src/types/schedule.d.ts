export interface ScheduleInfo {
  user: string;
  status: string;
  title: string;
  from_at: Date;
  from_time: string;
  to_at: Date;
  to_time: string;
  collaborators: string[];
  content: string;
}

export interface iScheduleList {
  id: string;
  type: string;
  title: string;
  top: number;
  start: number;
  end: number;
}
