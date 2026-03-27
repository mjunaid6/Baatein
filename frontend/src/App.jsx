import { Navigate, Route, Routes } from "react-router-dom"
import ChatPage from "./pages/ChatPage"
import AdminHomePage from "./pages/AdminHomePage"
import ProtectedRoute from "./auth/ProtectedRoute"
import AdminRoute from "./auth/AdminRoute"
import RootRedirection from "./auth/redirections/RootRedirection"
import RegisterRedirection from "./auth/redirections/RegisterRedirection"
import LoginRedirection from "./auth/redirections/LoginRedirection"
import { useEffect, useState } from "react"

function App() {
  const useIsMobile = () => {
      const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

      useEffect(() => {
          const handleResize = () => {
              setIsMobile(window.innerWidth < 768);
          };

          window.addEventListener("resize", handleResize);
          return () => window.removeEventListener("resize", handleResize);
      }, []);

      return isMobile;
  };
  return (
    <>
      <Routes>
        <Route path="/" element={<RootRedirection/>} />
        <Route path="/login" element={<LoginRedirection/>} />
        <Route path="/register" element={<RegisterRedirection/>} />

        <Route element={<ProtectedRoute/>}>
          <Route path="/chat" element={<ChatPage useIsMobile={useIsMobile}/>}>
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
