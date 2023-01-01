import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../app/store";
import { useEffect } from "react";
import { getAllLobbies } from "../features/lobbiesSlice";
import { getMapsAll } from "../features/hexMapSlice";
import { getCharacterMetadataAll } from "../features/charactersSlice";
import { getAbilityMetadatas } from "../features/abilitiesSlice";

export default function BackgroundService() {
  const dispatch = useDispatch();
  const authData = useSelector((state: RootState) => state.authData);
  const lobbiesData = useSelector((state: RootState) => state.lobbiesData);
  const hexmapsData = useSelector((state: RootState) => state.hexMapData);
  const charactersData = useSelector((state: RootState) => state.charactersData);
  const abilitiesData = useSelector((state: RootState) => state.abilitiesData);
  useEffect(() => {
    if (!lobbiesData.initialized) dispatch(getAllLobbies());
    if (!hexmapsData.initialized) dispatch(getMapsAll());
    if (!charactersData.initialized) dispatch(getCharacterMetadataAll());
    if (!abilitiesData.initialized) dispatch(getAbilityMetadatas());
  }, [
    authData.login,
    dispatch,
    hexmapsData.initialized,
    lobbiesData.initialized,
    charactersData.initialized,
    abilitiesData.initialized,
  ]);
  return null;
}
