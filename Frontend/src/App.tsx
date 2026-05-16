import { BrowserRouter, Routes, Route } from "react-router"
import Home from "./pages/Home.tsx"
import Footer from "./components/Footer/Footer.tsx"
import Page404 from "./pages/PageNotFound.tsx"
import { LoginForm } from "./pages/LoginPage.tsx"
import RegisterForm from "./pages/RegistartionPage.tsx"
import { useAuth } from "./hooks/useAuth.ts"
import { useEffect } from "react"

export function App() {

  const { getLoggedInUser } = useAuth()
  
  useEffect(() => {
    getLoggedInUser();
  },[])
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/register" element={<RegisterForm />} />

        <Route path="*" element={<Page404/>}/>
      </Routes>
      <Footer/>
    </BrowserRouter>
  )
  
}