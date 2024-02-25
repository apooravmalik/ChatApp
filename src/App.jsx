import React, { useState, useRef } from "react";
import "./App.css";
import { Auth } from "./components/Auth";
import Cookies from 'universal-cookie';
import { Chat } from "./components/Chat.jsx";
const cookies = new Cookies();
import { AppWrapper } from "./components/AppWrapper.jsx";
import "../src/App.css"
import Footer from "./components/Footer.jsx";

function App() {
  const [isAuth, setIsAuth] = useState(cookies.get("auth-token"));
  const [isInChat, setIsInChat] = useState(null);
  const [room, setRoom] = useState("");

  if (!isAuth) {
    return (
      <AppWrapper
        isAuth={isAuth}
        setIsAuth={setIsAuth}
        setIsInChat={setIsInChat}
      >
        <Auth setIsAuth={setIsAuth} />
      </AppWrapper>
    );
  }

  return (
    <><AppWrapper isAuth={isAuth} setIsAuth={setIsAuth} setIsInChat={setIsInChat}>
      {!isInChat ? (
        <div className="room flex gap-4">
          <label className="font-semibold py-3 text-red-500"> Type room name: </label>
          <input className="h-12 min-w-[12rem] rounded-lg border-red-600 indent-4 shadow-lg focus:outline-none focus:ring focus:ring-orange-500"
            placeholder="Room Name...." onChange={(e) => setRoom(e.target.value)} />
          <button
            className="class=inline-block text-white font-bold py-2 px-4 rounded-full bg-gradient-to-r from-red-600 to-orange-500 border border-transparent transform hover:scale-110 hover:border-white transition-transform duration-3000 ease-in-out "
            onClick={() => {
              setIsInChat(true);
            } }
          >
            Enter Chat
          </button>
        </div>
      ) : (
        <Chat room={room} />
      )}

    </AppWrapper><Footer /></>
  );
}

export default App;
