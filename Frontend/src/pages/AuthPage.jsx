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