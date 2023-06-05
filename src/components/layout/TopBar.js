import { AppBar, IconButton, Typography } from "@mui/material";
import {
  MinimizeRounded,
  FullscreenRounded,
  CloseRounded,
} from "@mui/icons-material";
import { styled } from "@mui/material/styles";
import { useEffect, useState } from "react";

const Bar = styled(AppBar)(({ theme }) => ({
  paddingRight: "1rem",
  height: "5vh",
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "end",
  backgroundColor: theme.palette.darkGrey.darker,
  zIndex: "1101",
  WebkitAppRegion: "drag",
  button: {
    WebkitAppRegion: "no-drag",
  },
  "& p:first-of-type": {
    marginLeft: "auto",
  },
  "& p:last-of-type": {
    marginRight: "auto",
  },
}));

const TypographyStyled = styled(Typography)(({ theme }) => ({
  fontSize: ".8rem",
  fontStyle: "italic",
  marginRight: "0.5rem",
  color: theme.palette.darkGrey.light,
}));

const IconButtonStyled = styled(IconButton)(({ theme }) => ({
  marginRight: ".5rem",
  padding: "2px",
}));

const TopBar = () => {
  const currentStatus = navigator.onLine;
  const [isOnline, setIsOnline] = useState(currentStatus);

  useEffect(() => {
    const updateOnlineStatus = () => {
      if (isOnline && !currentStatus) setIsOnline(false);
      if (!isOnline && currentStatus) setIsOnline(true);
    };

    window.addEventListener("online", updateOnlineStatus);
    window.addEventListener("offline", updateOnlineStatus);

    return () => {
      window.removeEventListener("online", updateOnlineStatus);
      window.removeEventListener("offline", updateOnlineStatus);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOnline, setIsOnline]);

  return (
    <Bar>
      <TypographyStyled>Chartr {window.electron.versions.app}</TypographyStyled>
      <TypographyStyled>
        Electron {window.electron.versions.electron}
      </TypographyStyled>
      {!isOnline && <Typography>Offline</Typography>}
      <IconButtonStyled
        color="info"
        onClick={() => {
          window.electron.minimize();
        }}
      >
        <MinimizeRounded />
      </IconButtonStyled>
      <IconButtonStyled
        color="info"
        onClick={() => {
          window.electron.maximize();
        }}
      >
        <FullscreenRounded />
      </IconButtonStyled>
      <IconButtonStyled
        color="error"
        onClick={() => {
          window.electron.close();
        }}
      >
        <CloseRounded />
      </IconButtonStyled>
    </Bar>
  );
};

export default TopBar;
