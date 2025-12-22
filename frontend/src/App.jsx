import { Route, Routes } from "react-router-dom"
import ChatPage from "./pages/ChatPage"
import Login from "./pages/Login"
import Register from "./pages/Register"
import FriendRequest from "./components/friends/FriendRequest"
import AdminHomePage from "./pages/AdminHomePage"

function App() {

  return (
    <>
      <Routes>
        <Route path="/" element={<Login/>} />
        <Route path="/Login" element={<Login/>} />
        <Route path="/Register" element={<Register/>} />
        <Route path="/Chat" element={<ChatPage/>}>
          <Route path="requests" element={<FriendRequest/>} />
        </Route>
        <Route path="/admin/*" element={<AdminHomePage/>}/>
      </Routes>
    </>
  )
}

export default App
