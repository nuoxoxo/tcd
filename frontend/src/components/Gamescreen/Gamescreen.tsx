import { useSnackbar } from "notistack";
import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { showSnackbarNotification } from "../../App";
import { SocketContext } from "../../context/socket";
import { Message } from "../Chat/Messages/Messages";
import Spectate from "./Spectate/Spectate";
import "./style.css";

const Gamescreen: React.FC = () => {
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const socket = useContext(SocketContext);

  useEffect(() => {
    if (socket) {
      /* Socket stuff */
      socket.on("chat/refresh-message", (payload: Message) => {
        /* Enable notification for that channel */
        if (payload.parent.type == "PRIVATE")
          showSnackbarNotification(
            enqueueSnackbar,
            "New message from " + payload.sender.username,
            "info"
          );
        else
          showSnackbarNotification(
            enqueueSnackbar,
            "New message in groupchat '" + payload.parent.name + "'",
            "info"
          );
      });
    }
    return () => {
      socket.off("chat/refresh-message");
    };
  }, [socket]);

  return (
    <div
      className="row"
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: "Courier, monospace",
      }}
    >
      <div className="column">
        <h1>Pong</h1>
        <button
          onClick={() => {
            navigate("/pong");
          }}
        >
          Begin
        </button>
      </div>
      <div className="column">
        {/* <h1>Currently played games</h1> */}
        <h1>Game History</h1>
        <Spectate />
      </div>
    </div>
  );
};
export default Gamescreen;
