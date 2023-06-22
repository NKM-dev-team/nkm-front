import { useDispatch } from "react-redux";
import { updateVersionIfNewer } from "../../features/versionSlice";
import { VERSION_CHECK_INTERVAL } from "../../app/consts";
import { useMountEffect } from "../../app/utils";

export default function BackgroundService() {
  const dispatch = useDispatch();

  const checkForNewVersionRepeatedly = () => {
    dispatch(updateVersionIfNewer());
    setTimeout(checkForNewVersionRepeatedly, VERSION_CHECK_INTERVAL);
  };

  useMountEffect(checkForNewVersionRepeatedly);

  return null;
}
