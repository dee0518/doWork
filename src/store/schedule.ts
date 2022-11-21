import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface Status {
  id: string;
  name: string;
  checked: boolean;
}

interface scheduleState {
  mode: string;
  statusFilter: Status[];
  searchKeyword: string;
  editedScheduleId: string;
  selected_at: string;
}

const initialState: scheduleState = {
  mode: 'week',
  statusFilter: [
    { id: '0', name: 'all', checked: true },
    { id: '1', name: 'to do', checked: true },
    { id: '2', name: 'private', checked: true },
    { id: '3', name: 'important', checked: true },
    { id: '4', name: 'meeting', checked: true },
  ],
  searchKeyword: '',
  editedScheduleId: '',
  selected_at: `${new Date().getFullYear()}.${new Date().getMonth() + 1}.${new Date().getDate()}`,
};

const schedule = createSlice({
  name: 'schedule',
  initialState,
  reducers: {
    setMode: (state, action: PayloadAction<string>) => {
      state.mode = action.payload;
    },
    setFilter: (state, action: PayloadAction<string>) => {
      const { id, checked } = state.statusFilter.find(st => st.id === action.payload);

      state.statusFilter = state.statusFilter.map(status => {
        if (id === '0') {
          return { ...status, checked: !checked };
        } else {
          if (checked) {
            return status.id === '0' || status.id === id ? { ...status, checked: false } : status;
          } else {
            const rest = state.statusFilter.filter(({ id, checked }) => id !== '0' && checked).length;

            if (rest === 3) {
              return { ...status, checked: true };
            } else {
              return status.id === id ? { ...status, checked: true } : status;
            }
          }
        }
      });
    },
    setSearchKeyword: (state, action: PayloadAction<string>) => {
      state.searchKeyword = action.payload;
    },
    setEditedScheduleId: (state, action: PayloadAction<string>) => {
      state.editedScheduleId = action.payload;
    },
    setSelectedAt: (state, action: PayloadAction<string>) => {
      const year: number = new Date(JSON.parse(action.payload)).getFullYear();
      const month: number = new Date(JSON.parse(action.payload)).getMonth();
      const date: number = new Date(JSON.parse(action.payload)).getDate();

      state.selected_at = `${year}.${month + 1}.${date}`;
    },
  },
});

export const scheduleActions = schedule.actions;
export default schedule;
