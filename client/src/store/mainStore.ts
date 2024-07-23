import { create, StateCreator } from "zustand";
import { devtools } from "zustand/middleware";

export type Task = {
  taskId: number;
  listIndex: number;
  date: string;
  startTime: string;
  endTime: string;
  title: string;
  details: string;
};

export type TaskList = {
  listIndex: number;
  tasks: Task[];
};

interface MainState {
  dailyTaskLists: TaskList[];
  standardDate: Date;
  actions: {
    changeDateBefore: () => void;
    changeDateAfter: () => void;
    changeTaskLists: (newTaskLists: TaskList[]) => void;
    addTask: (listIndex: number, newTask: Task) => void;
    updateTask: (listIndex: number, updateTask: Task) => void;
    deleteTask: (listIndex: number, taskId: number) => void;
  };
}

const mainStore: StateCreator<MainState> = (set) => ({
  standardDate: new Date(),
  dailyTaskLists: [
    {
      listIndex: 0,
      tasks: [
        {
          taskId: 1,
          listIndex: 0,
          date: "2024-07-22",
          startTime: "09:00",
          endTime: "11:00",
          title: "",
          details: "운동",
        },
      ],
    },
    {
      listIndex: 1,
      tasks: [],
    },
    {
      listIndex: 2,
      tasks: [],
    },
    {
      listIndex: 3,
      tasks: [],
    },
  ],
  actions: {
    changeDateBefore: () => {
      set((state) => {
        const newDate = new Date(state.standardDate);
        newDate.setDate(newDate.getDate() - 1);
        return { standardDate: newDate };
      });
    },
    changeDateAfter: () => {
      set((state) => {
        const newDate = new Date(state.standardDate);
        newDate.setDate(newDate.getDate() + 1);
        return { standardDate: newDate };
      });
    },
    changeTaskLists: (newTaskLists: TaskList[]) =>
      set(() => ({
        dailyTaskLists: newTaskLists,
      })),
    addTask: (listIndex: number, newTask: Task) => {
      set((state) => {
        const updateDailyTaskLists = state.dailyTaskLists.map((lists) => {
          if (lists.listIndex === listIndex) {
            return {
              ...lists,
              tasks: [...lists.tasks, newTask],
            };
          }
          return lists;
        });
        return { dailyTaskLists: updateDailyTaskLists };
      });
    },
    updateTask: (listIndex: number, updateTask: Task) => {
      set((state) => {
        const updateDailyTaskLists = state.dailyTaskLists.map((lists) => {
          if (lists.listIndex === listIndex) {
            return {
              ...lists,
              tasks: lists.tasks.map((task) => (task.taskId === updateTask.taskId ? updateTask : task)),
            };
          }
          return lists;
        });
        return { dailyTaskLists: updateDailyTaskLists };
      });
    },
    deleteTask: (listIndex: number, taskId: number) => {
      set((state) => {
        const updateDailyTaskLists = state.dailyTaskLists.map((lists) => {
          if (lists.listIndex === listIndex) {
            return {
              ...lists,
              tasks: lists.tasks.filter((task) => task.taskId !== taskId),
            };
          }
          return lists;
        });
        return { dailyTaskLists: updateDailyTaskLists };
      });
    },
  },
});

const useMainStore = create<MainState>()(devtools(mainStore, { name: "MainPage Store" }));

export const changeDateBefore = () => useMainStore.getState().actions.changeDateBefore();
export const changeDateAfter = () => useMainStore.getState().actions.changeDateAfter();

export default useMainStore;