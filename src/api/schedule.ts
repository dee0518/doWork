import { SERVER_URL, request } from './index';
// eslint-disable-next-line import/no-unresolved
import { ScheduleInfo } from '../types/schedule';

const getScheduleAll = async (email: string) => {
  const options = {
    method: 'GET',
  };

  return request(`${SERVER_URL}/schedule.json?orderBy="user"&equalTo="${email}"`, options);
};

const postSchedule = async (schedule: ScheduleInfo) => {
  const options = {
    method: 'POST',
    body: JSON.stringify(schedule),
    headers: {
      'Content-Type': 'application/json',
    },
  };

  return request(`${SERVER_URL}/schedule.json`, options);
};

export { getScheduleAll, postSchedule };
