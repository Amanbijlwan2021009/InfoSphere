import { Container } from "@chakra-ui/react";
import { Navigate, Route, Routes } from "react-router-dom";
import UserPage from "./pages/UserPage";
import PostPage from "./pages/PostPage";
import HomePage from "./pages/HomePage";
import AuthPage from "./pages/AuthPage";
import Header from "./components/Header";
import LogoutButton from "./components/LogoutButton";
import { useRecoilValue } from "recoil";
import userAtom from "./atoms/userAtom";
// import  UserHeader  from "./components/UserHeader.jsx";


function App() {

  const user = useRecoilValue(userAtom)
  console.log(user)

  return (
    <Container maxW="620px">
      <Header />

      <Routes>

        <Route path='/' element={user ? <HomePage /> : <Navigate to="/auth" />} /> {/*If you have a user then go to home page otherwise go to auth page */}

        <Route path='/auth' element={!user ? <AuthPage /> : <Navigate to="/" />} />

        <Route path='/:username' element={<UserPage />} />
        <Route path='/:username/post/:pid' element={<PostPage />} />
        {/* <Route path="/:username" element={<UserPage />} /> */}


      </Routes>
      {user && <LogoutButton />}
    </Container>
  );
}

export default App;
