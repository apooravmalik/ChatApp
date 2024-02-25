import React, { useState, useEffect } from "react";
import { db, auth } from "../firebase-config";
import {
  collection,
  addDoc,
  where,
  serverTimestamp,
  onSnapshot,
  query,
  orderBy,
} from "firebase/firestore";


export const Chat = ({ room }) => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const messagesRef = collection(db, "messages");

  useEffect(() => {
    const queryMessages = query(
      messagesRef,
      where("room", "==", room),
      orderBy("createdAt")
    );
    const unsuscribe = onSnapshot(queryMessages, (snapshot) => {
      let messages = [];
      snapshot.forEach((doc) => {
        messages.push({ ...doc.data(), id: doc.id });
      });
      console.log(messages);
      setMessages(messages);
    });

    return () => unsuscribe();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (newMessage === "") return;
    await addDoc(messagesRef, {
      text: newMessage,
      createdAt: serverTimestamp(),
      user: auth.currentUser.displayName,
      room,
    });

    setNewMessage("");
  };

  return (
    <div className="chat-app">
      <div className="header">
        <h1 className="font-bold text-lg text-red-500">Welcome to: {room.toUpperCase()}</h1>
      </div>
      <div className="messages grid gap-2">
        {messages.map((message) => (
          <div key={message.id} className="message flex flex-col w-full max-w-[320px] p-2 border-gray-200 bg-gray-100 rounded-e-xl rounded-es-xl ">
            <span className="user font-semibold">{message.user}:</span> {message.text}
          </div>
        ))}
      </div>
      <form onSubmit={handleSubmit} className="new-message-form p-3 m-3 grid col-auto gap-3">
        <input
          type="text"
          value={newMessage}
          onChange={(event) => setNewMessage(event.target.value)}
          className="new-message-input h-12 min-w-[12rem] rounded-lg border-red-600 indent-4 shadow-lg focus:outline-none focus:ring focus:ring-orange-500"
          placeholder="Type your message..."
        />
        <button type="submit" className="send-button class=inline-block text-white font-bold py-2 px-4 rounded-full bg-gradient-to-r from-red-600 to-orange-500 border border-transparent transform hover:scale-110 hover:border-white transition-transform duration-3000 ease-in-out">
          Send
        </button>
      </form>
    </div>
  );
};