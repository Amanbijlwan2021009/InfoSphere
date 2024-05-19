// I think this page contains LoginCard and SignupCard but to make this page look readable we have created their component and then imported them here  

<<<<<<< HEAD
import { useRecoilValue } from "recoil";
import LoginCard from "../components/LoginCard";
import SignupCard from "../components/SignupCard";
import authScreenAtom from "../atoms/authAtom";

const AuthPage = () => {
    const authScreenState = useRecoilValue(authScreenAtom);

    return <>{authScreenState === "login" ? <LoginCard /> : <SignupCard />}</>;
};

export default AuthPage;
=======
import { useRecoilValue, useSetRecoilState } from "recoil"
import authScreenAtom from "../atoms/authAtom"
import LoginCard from "../components/LoginCard"
import SignupCard from "../components/SignupCard"

const AuthPage = () => {

    const authScreenState = useRecoilValue(authScreenAtom)
    // // const [value, setValue] = useState("login")
    // useSetRecoilState(authScreenAtom)

    console.log(authScreenState)
    return <>
        {/* <SignupCard /> */}
        {authScreenState === "login" ? <LoginCard /> : <SignupCard />}
    </>
}

export default AuthPage
>>>>>>> 0d00deef4c1f037fa075847f988ac901c685e54f
