import { Button } from "@chakra-ui/react"
import { useSetRecoilState } from "recoil"
import userAtom from "../atoms/userAtom"
import useShowToast from "../hooks/useShowToast"

const LogoutButton = () => {
    const setUser = useSetRecoilState(userAtom)
    const showToast = useShowToast
    const handleLogout = async () => {
        try {
            //fetch

            const res = await fetch("/api/users/logout", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
            })

            const data = await res.json()
            console.log(data)

            if (data.error) {
                showToast("Error", data.error, "error")
                return; //If there is error then we will show the toast and then return out of this function .... 
            }
            // BUT , if there is no error , then we will clear our local storage

            localStorage.removeItem("user-threads")

            setUser(null)//this will set user to null 

        } catch (error) {
            showToast("Error", error, "error")

        }
    }
    return (

        <Button position={"fixed"} right={"30px"} top={"30px"} size={"sm"} onClick={handleLogout}>

            <div>Logout</div>
        </Button>
    )
}

export default LogoutButton