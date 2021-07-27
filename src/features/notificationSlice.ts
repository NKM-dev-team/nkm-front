import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface NotistackNotification {
  key: string | number;
  message: string;
  options: object | null;
}

interface NotificationState {
  notifications: NotistackNotification[];
}

const initialState: NotificationState = {
  notifications: [],
};

export const notificationSlice = createSlice({
  name: "notification",
  initialState,
  reducers: {
    enqueueNotification: (
      state,
      action: PayloadAction<NotistackNotification>
    ) => {
      state.notifications.push(action.payload);
    },

    dequeueNotification: (state, action: PayloadAction<string | number>) => {
      state.notifications = state.notifications.filter(
        (n) => n.key === action.payload
      );
    },
  },
});

export const {
  enqueueNotification,
  dequeueNotification,
} = notificationSlice.actions;

export const enqueueNotificationSimple = (message: string, variant: string) =>
  enqueueNotification({
    key: new Date().getTime() + Math.random(),
    message: message,
    options: {
      variant: variant,
    },
  });

export const enqueueNotificationSuccess = (message: string) =>
  enqueueNotificationSimple(message, "success");

export const enqueueNotificationWarning = (message: string) =>
  enqueueNotificationSimple(message, "warning");

export const enqueueNotificationError = (message: string) =>
  enqueueNotificationSimple(message, "error");

export const enqueueNotificationInfo = (message: string) =>
  enqueueNotificationSimple(message, "info");

export default notificationSlice.reducer;
