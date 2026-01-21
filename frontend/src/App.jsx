import { Route, Routes } from "react-router-dom"
import ChatPage from "./pages/ChatPage"
import Login from "./pages/Login"
import Register from "./pages/Register"
import FriendRequest from "./components/friends/FriendRequest"
import AdminHomePage from "./pages/AdminHomePage"
import ProtectedRoute from "./auth/ProtectedRoute"
import AdminRoute from "./auth/AdminRoute"

function App() {

  return (
    <>
      <Routes>
        <Route path="/" element={<Login/>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/register" element={<Register/>} />

        <Route element={<ProtectedRoute/>}>
          <Route path="/chat" element={<ChatPage/>}>
            <Route path="requests" element={<FriendRequest/>} />
          </Route>
        </Route>

        <Route element={<AdminRoute/>}>
          <Route path="/admin/*" element={<AdminHomePage/>}/>
        </Route>
      </Routes>
    </>
  )
}

export default App
