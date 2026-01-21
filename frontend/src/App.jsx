import { Navigate, Route, Routes } from "react-router-dom"
import ChatPage from "./pages/ChatPage"
import Login from "./pages/Login"
import Register from "./pages/Register"
import FriendRequest from "./components/friends/FriendRequest"
import AdminHomePage from "./pages/AdminHomePage"
import ProtectedRoute from "./auth/ProtectedRoute"
import AdminRoute from "./auth/AdminRoute"
import RootRedirection from "./auth/redirections/RootRedirection"
import RegisterRedirection from "./auth/redirections/RegisterRedirection"
import LoginRedirection from "./auth/redirections/LoginRedirection"

function App() {

  return (
    <>
      <Routes>
        <Route path="/" element={<RootRedirection/>} />
        <Route path="/login" element={<LoginRedirection/>} />
        <Route path="/register" element={<RegisterRedirection/>} />

        <Route element={<ProtectedRoute/>}>
          <Route path="/chat" element={<ChatPage/>}>
            <Route path="requests" element={<FriendRequest/>} />
          </Route>
        </Route>

        <Route element={<AdminRoute/>}>
          <Route path="/admin/*" element={<AdminHomePage/>}/>
        </Route>

        <Route path="*" element={<Navigate to={"/"} replace/>}/>
      </Routes>
    </>
  )
}

export default App
