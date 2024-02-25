import { auth } from "../firebase-config.js";
import { signOut } from "firebase/auth";

import Cookies from "universal-cookie";

const cookies = new Cookies();

export const AppWrapper = ({ children, isAuth, setIsAuth, setIsInChat }) => {
  const signUserOut = async () => {
    await signOut(auth);
    cookies.remove("auth-token");
    setIsAuth(false);
    setIsInChat(false);
  };

  return (
    <>
      <div className="App">
        <div className="app-header flex justify-center items-cente">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-red-500 to-orange-600 bg-clip-text text-transparent py-5">
            Chat App
          </h1>
        </div>

        <div className="app-container">{children}</div>
        {isAuth && (
          <div className="sign-out py-5 flex justify-center items-center">
            <a
              onClick={signUserOut}
              href=""
              class="text-red-600 border border-orange-500 py-4 px-6 rounded inline-flex items-center"
            >
              Sign Out
              <svg
                fill="none"
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                viewBox="0 0 24 24"
                class="w-6 h-6 ml-2"
              >
                <path d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
              </svg>
            </a>
          </div>
        )}
      </div>
      
    </>
  );
};
