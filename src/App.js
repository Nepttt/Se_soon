import React, {useState} from 'react';
import IndexPage from './IndexPage';
import SignUpPage from './SignUpPage';
import ChatRoom from "./ChatRoom";
import ChatRoomsManagerPage from "./ChatRoomsManagerPage";
import { Routes, Route, BrowserRouter } from "react-router-dom";


function App() {
    const [chatRooms, setChatRooms] = useState([]);

    return (
      <BrowserRouter>
          <Routes>
              <Route path={"/"} element={<IndexPage />} />
              <Route path={"/sign_up"} element={<SignUpPage />} />
              <Route path="/chat" element={<ChatRoom chatRooms={chatRooms} />} />
              {/* 나중에 chat 유저 토큰으로 넘겨주세요 */}
          </Routes>
      </BrowserRouter>
  );
}

export default App;
