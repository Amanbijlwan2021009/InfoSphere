<<<<<<< HEAD
import { Box, Container } from "@chakra-ui/react";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import UserPage from "./pages/UserPage";
import PostPage from "./pages/PostPage";
import Header from "./components/Header";
import HomePage from "./pages/HomePage";
import AuthPage from "./pages/AuthPage";
import { useRecoilValue } from "recoil";
import userAtom from "./atoms/userAtom";
import UpdateProfilePage from "./pages/UpdateProfilePage";
import CreatePost from "./components/CreatePost";
// import ChatPage from "./pages/ChatPage";
// import { SettingsPage } from "./pages/SettingsPage";
function App() {
	const user = useRecoilValue(userAtom);
	const { pathname } = useLocation();
	return (
		<Box position={"relative"} w='full'>
			<Container maxW={pathname === "/" ? { base: "620px", md: "900px" } : "620px"}>
				<Header />
				<Routes>
					<Route path='/' element={user ? <HomePage /> : <Navigate to='/auth' />} />
					<Route path='/auth' element={!user ? <AuthPage /> : <Navigate to='/' />} />
					<Route path='/update' element={user ? <UpdateProfilePage /> : <Navigate to='/auth' />} />

					<Route
						path='/:username'
						element={
							user ? (
								<>
									<UserPage />
									<CreatePost />
								</>
							) : (
								<UserPage />
							)
						}
					/>
					<Route path='/:username/post/:pid' element={<PostPage />} />
					{/* <Route path='/chat' element={user ? <ChatPage /> : <Navigate to={"/auth"} />} /> */}
					{/* <Route path='/settings' element={user ? <SettingsPage /> : <Navigate to={"/auth"} />} /> */}
				</Routes>
			</Container>
		</Box>
	);
=======
import { Container } from "@chakra-ui/react";
import { Navigate, Route, Routes } from "react-router-dom";
import UserPage from "./pages/UserPage";
import PostPage from "./pages/PostPage";
import HomePage from "./pages/HomePage";
import AuthPage from "./pages/AuthPage";
import UpdateProfilePage from "./pages/UpdateProfilePage";
import Header from "./components/Header";
import LogoutButton from "./components/LogoutButton";
import { useRecoilValue } from "recoil";
import userAtom from "./atoms/userAtom";
import CreatePost from "./components/CreatePost";
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

        <Route path='/update' element={user ? <UpdateProfilePage /> : <Navigate to="/auth" />} />

        <Route path='/:username' element={<UserPage />} />
        <Route path='/:username/post/:pid' element={<PostPage />} />
        {/* <Route path="/:username" element={<UserPage />} /> */}


      </Routes>

      {user && <LogoutButton />}
      {user && <CreatePost />}

    </Container>
  );
>>>>>>> 0d00deef4c1f037fa075847f988ac901c685e54f
}

export default App;
