import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../app/store";
import { useEffect } from "react";
import { getAllLobbies } from "../features/lobbiesSlice";
import { getMapsAll } from "../features/hexMapSlice";

export default function BackgroundService() {
  const dispatch = useDispatch();
  const authData = useSelector((state: RootState) => state.authData);
  const lobbiesData = useSelector((state: RootState) => state.lobbiesData);
  const hexmapsData = useSelector((state: RootState) => state.hexMapData);
  useEffect(() => {
    if (!lobbiesData.initialized) dispatch(getAllLobbies());
    if (!hexmapsData.initialized) dispatch(getMapsAll());
  }, [
    authData.login,
    dispatch,
    hexmapsData.initialized,
    lobbiesData.initialized,
  ]);
  return null;
}
