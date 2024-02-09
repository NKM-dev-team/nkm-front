import React, { useEffect, useState } from "react";
import axios from "axios";
import { Card, CardContent, Link, Typography } from "@mui/material";
import { formatDistanceToNow } from "date-fns";

interface LastCommitInfoProps {
  owner: string;
  repo: string;
  mainBranch: string;
}

const LastCommitInfo: React.FC<LastCommitInfoProps> = ({
  owner,
  repo,
  mainBranch,
}) => {
  const [lastCommitTimeAgo, setLastCommitTimeAgo] = useState<string>("");
  const [lastCommitHash, setLastCommitHash] = useState<string>("");
  const [lastCommitMessage, setLastCommitMessage] =
    useState<React.ReactNode>("");

  const hashUrl = (hash: string) =>
    `https://github.com/${owner}/${repo}/commit/${hash}`;

  const allCommitsUrl = `https://github.com/${owner}/${repo}/commits/${mainBranch}`;

  useEffect(() => {
    const url = `https://api.github.com/repos/${owner}/${repo}/commits?sha=${mainBranch}`;

    axios
      .get(url)
      .then((response) => {
        const commits = response.data;
        if (commits.length > 0) {
          const lastCommit = commits[0];
          const date = lastCommit.commit.committer.date;
          const message = lastCommit.commit.message;
          const hash = lastCommit.sha;

          const timeAgo = formatDistanceToNow(new Date(date), {
            addSuffix: true,
          });

          setLastCommitTimeAgo(timeAgo);
          setLastCommitHash(hash);
          setLastCommitMessage(message);
          setLastCommitMessage(parseCommitMessage(message));
        }
      })
      .catch((error) => {
        console.error("Failed to fetch commits:", error);
      });
  }, [owner, repo, mainBranch]);

  const parseCommitMessage = (message: string): React.ReactNode => {
    const ticketPattern = /(NKM-\d+)/g;
    return message.split(ticketPattern).map((part, index) => {
      if (ticketPattern.test(part)) {
        return (
          <Link
            key={index}
            href={`https://kruczkowski.atlassian.net/browse/${part}`}
            target="_blank"
          >
            {part}
          </Link>
        );
      } else {
        return part;
      }
    });
  };

  return (
    <div style={{ height: "100%", display: "flex", flexDirection: "column" }}>
      <Card
        variant="outlined"
        sx={{ flex: 1, display: "flex", flexDirection: "column" }}
      >
        <CardContent sx={{ flex: 1 }}>
          <Typography gutterBottom variant="body1" component="div">
            {owner}/{repo}
          </Typography>
          <Typography variant="body2" component="p" color="text.primary">
            {lastCommitTimeAgo ? `${lastCommitTimeAgo}` : "Loading..."}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            <Link target="_blank" href={hashUrl(lastCommitHash)}>
              {lastCommitHash}
            </Link>
          </Typography>
          <Typography
            variant="body2"
            color="text.secondary"
            component="div"
            sx={{ marginTop: 1 }}
          >
            {lastCommitMessage}
          </Typography>
        </CardContent>
        <CardContent>
          <Typography variant="body2" component="div" sx={{ marginTop: 1 }}>
            <Link href={allCommitsUrl} target="_blank">
              View all commits
            </Link>
          </Typography>
        </CardContent>
      </Card>
    </div>
  );
};

export default LastCommitInfo;
