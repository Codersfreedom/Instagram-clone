import { Navigate, Route, Routes } from "react-router-dom"
import AuthPage from "./Pages/AuthPage/AuthPage"
import PageLayout from "./Layouts/PageLayout/PageLayout"
import HomePage from "./Pages/HomePage/HomePage"
import ProfilePage from "./Pages/ProfilePage/ProfilePage"
import useAuthStore from "./store/authStore"



function App() {

  const {user} = useAuthStore();


  return (
    <PageLayout>
      <Routes>

        <Route path ="/" element ={ user ? <HomePage/>: <Navigate to="/auth" />} />
        <Route path="/auth" element={ !user ? <AuthPage /> : <Navigate to="/" />  } />
        <Route path ="/:username" element={<ProfilePage/>}/> 

      </Routes>
    </PageLayout>
  )
}

export default App
