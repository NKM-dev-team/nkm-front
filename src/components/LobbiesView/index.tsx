import React from "react";
import { Typography } from "@material-ui/core";
import { useSelector } from "react-redux";
import { RootState } from "../../app/store";
import { LobbyState } from "../../features/lobbiesSlice";

export default function LobbiesView() {
  const lobbiesData = useSelector((state: RootState) => state.lobbiesData);
  return (
    <>
      {lobbiesData.lobbyList.length === 0 ? (
        <Typography>No lobbies created yet</Typography>
      ) : (
        ""
      )}
      {lobbiesData.lobbyList.map((lobbyState: LobbyState) => (
        <div key={lobbyState.id}>
          <Typography>{lobbyState.name}</Typography>
          <Typography>{lobbyState.hostUserId}</Typography>
          <Typography>{lobbyState.creationDate}</Typography>
          <Typography>{lobbyState.userIds.join(" ")}</Typography>
        </div>
      ))}
    </>
  );
}
