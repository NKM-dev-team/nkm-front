import { useDispatch} from "react-redux";
import {updateVersionIfNewer} from "../features/versionSlice";
import {API_CHECK_TIMEOUT} from "../app/consts";
import {useMountEffect} from "../app/utils";

export default function BackgroundService() {
  const dispatch = useDispatch();

  const checkForNewVersionRepeatedly = () => {
    dispatch(updateVersionIfNewer());
    setTimeout(checkForNewVersionRepeatedly, API_CHECK_TIMEOUT);
  }

  useMountEffect(checkForNewVersionRepeatedly);

  return null;
}
