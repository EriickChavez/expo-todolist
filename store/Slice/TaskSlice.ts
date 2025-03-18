import { PayloadAction, createSlice } from "@reduxjs/toolkit";

import { RootState } from "../store";
import uuid from "react-native-uuid";
import { InputTask, Task } from "@/interfaces/tasks";
interface TaskSliceState {
  taskList: Task[];
}

const initialState: TaskSliceState = {
  taskList: [],
};

const taskSlice = createSlice({
  name: "taskSlice",
  initialState,
  reducers: {
    resetState: () => initialState,
    newTask: (state, action: PayloadAction<{ task: InputTask }>) => {
      const { task } = action.payload;

      const newTask: Task = {
        ...task,
        id: `${uuid.v4()}`,
      };

      state.taskList = [...state.taskList, newTask];
    },
    removeTask: (state, action: PayloadAction<{ id: string }>) => {
      const { id } = action.payload;
      state.taskList = state.taskList.filter((task) => task.id !== id);
    },
    setDraggableData: (state, action: PayloadAction<{ data: Task[] }>) => {
      const { data } = action.payload;
      state.taskList = data;
    },
    updateTask: (state, action: PayloadAction<{ task: Task }>) => {
      const { task } = action.payload;
      state.taskList = state.taskList.map((t) => {
        if (t.id === task.id) {
          return task;
        }
        return t;
      });
    },
  },
});

export default {
  reducer: taskSlice.reducer,
  actions: taskSlice.actions,
};

export const taskSelector = (state: RootState) => state.tasks;
