// import { UserHeader } from "../components/UserHeader.jsx";
import { useEffect, useState } from "react";
import UserHeader from "../components/UserHeader";
import UserPost from "../components/UserPost";
import { useParams } from "react-router-dom";
import useShowToast from "../hooks/useShowToast";


const UserPage = () => {
    // console.log("UserPage component rendering...");

    const [user, setUser] = useState(null)

    const { username } = useParams()
    const showToast = useShowToast
    useEffect(() => {
        const getUser = async () => {
            try {
                const res = await fetch(`/api/users/profile/${username}`)
                const data = await res.json()
                console.log(data)
                if (data.error) {
                    showToast("Error", data.error, "error")
                    return;
                }
                setUser(data)

            } catch (error) {
                showToast("Error", data.error, "error")
            }
        }
        getUser();
    }, [username, showToast]);

    if (!user) {return null};

    return (
        <>
            <UserHeader user={user} />
            <UserPost likes={1300} replies={432} postImg="./post1.png" postTitle="Wooh! It's working..😵" />
            <UserPost likes={211} replies={1222} postImg="./post2.png" postTitle="It worked again.. Hurray😏" />
            <UserPost likes={93} replies={21} postImg="./d.jpg" postTitle="What you say?? Am i inferior to any celebrity?🧐 ......Any competitor💀?" />
            <UserPost likes={1002} replies={983} postTitle="Hacked.." />
        </>
    )

};

export default UserPage;