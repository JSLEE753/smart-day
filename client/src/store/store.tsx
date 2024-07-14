import { create, StateCreator } from "zustand";
import { devtools } from "zustand/middleware";

type ModalType =
  | "datepickerModal"
  | "dayModal"
  | "locationModal"
  | "loggerModal"
  | "loginModal"
  | "registerModal"
  | "taskModal"
  | "todoScheduleModal"
  | "userEditModal";
interface ModalState {
  datepickerModal: boolean;
  dayModal: boolean;
  locationModal: boolean;
  loggerModal: boolean;
  loginModal: boolean;
  registerModal: boolean;
  taskModal: boolean;
  todoScheduleModal: boolean;
  userEditModal: boolean;

  actions: {
    changeModalState: (type: ModalType) => void;
  };
}

interface userInfoState {
  userId: number | null;
  selectedDate: Date | undefined;
  currentLocation: string;
  favoriteLocations: string[];

  actions: {
    // 1. 선택된 날짜를 저장하는 리듀서
    setSelectedDate: (arg1: Date) => void;

    // 2. 선택된 날짜를 초기화하는 리듀서
    initializeSelectedDate: () => void;

    // 3. 현재 위치를 선택하는 리듀서
    setCurrentLocation: (currentLocation: string) => void;

    // 4. 현재 위치를 즐겨찾기하는 리듀서
    addFavoriteLocation: (location: string) => void;

    // 5. 즐겨찾기한 위치를 삭제하는 리듀서
    deleteFavoriteLocation: (location: string) => void;
  };
}

const modalStore: StateCreator<ModalState> = (set) => ({
  datepickerModal: false,
  dayModal: false,
  locationModal: false,
  loggerModal: false,
  loginModal: false,
  registerModal: false,
  taskModal: false,
  todoScheduleModal: false,
  userEditModal: false,
  actions: {
    changeModalState: (type) => {
      set((state) => ({ ...state, [type]: !state[type] }));
    },
  },
});

const userInfoStore: StateCreator<userInfoState> = (set) => ({
  userId: null,
  selectedDate: undefined,
  currentLocation: "",
  favoriteLocations: [],

  actions: {
    setSelectedDate: (date) => {
      set((state) => ({ ...state, selectedDate: date }));
    },

    initializeSelectedDate: () => {
      set((state) => ({ ...state, selectedDate: undefined }));
    },

    setCurrentLocation: (currentLocation) => {
      set((state) => ({ ...state, currentLocation: currentLocation }));
    },

    addFavoriteLocation: (location) => {
      set((state) => {
        if (location.trim() === "") {
          return { ...state };
        }

        let isOverlapped = false;

        state.favoriteLocations.forEach((favoriteLocation) => {
          if (favoriteLocation === location) {
            isOverlapped = true;
          }
        });

        if (isOverlapped) {
          return { ...state };
        }

        return {
          ...state,
          favoriteLocations: [...state.favoriteLocations, location],
        };
      });
    },

    deleteFavoriteLocation: (location) => {
      set((state) => {
        return {
          ...state,
          favoriteLocations: state.favoriteLocations.filter((favoriteLocation) => {
            return favoriteLocation !== location;
          }),
        };
      });
    },
  },
});

const useModalStore = create<ModalState>()(devtools(modalStore, { name: "Modal Store" }));
export const useUserInfoStore = create<userInfoState>()(devtools(userInfoStore, { name: "User Info Store" }));

export const toggleDatepickerModal = () => useModalStore.getState().actions.changeModalState("datepickerModal");
export const toggleDayModal = () => useModalStore.getState().actions.changeModalState("dayModal");
export const toggleLocationModal = () => useModalStore.getState().actions.changeModalState("locationModal");
export const toggleLoggerModal = () => useModalStore.getState().actions.changeModalState("loggerModal");
export const toggleLoginModal = () => useModalStore.getState().actions.changeModalState("loginModal");
export const toggleRegisterModal = () => useModalStore.getState().actions.changeModalState("registerModal");
export const toggleTaskModal = () => useModalStore.getState().actions.changeModalState("taskModal");
export const toggleTodoScheduleModal = () => useModalStore.getState().actions.changeModalState("todoScheduleModal");
export const toggleUserEditModal = () => useModalStore.getState().actions.changeModalState("userEditModal");

export default useModalStore;
