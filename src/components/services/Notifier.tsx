import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../app/store";
import { useSnackbar } from "notistack";
import { useEffect } from "react";
import { dequeueNotification } from "../../features/notificationSlice";

let shownNotificationKeys: (string | number)[] = [];
export default function Notifier() {
  const dispatch = useDispatch();
  const notificationData = useSelector(
    (state: RootState) => state.notificationData
  );
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  useEffect(() => {
    notificationData.notifications
      .filter((n) => !shownNotificationKeys.includes(n.key))
      .forEach(({ key, message, options }) => {
        shownNotificationKeys.push(key); // remember shown notification to avoid loops
        enqueueSnackbar(message, {
          key,
          ...options,
          onExited: (event, snackbarKey) => {
            dispatch(dequeueNotification(snackbarKey.toString()));
          },
        });
      });
  }, [
    notificationData.notifications,
    closeSnackbar,
    enqueueSnackbar,
    dispatch,
  ]);
  return null;
}
