// import { UserHeader } from "../components/UserHeader.jsx";
import UserHeader from "../components/UserHeader";
import UserPost from "../components/UserPost";


const UserPage = () => {
    // console.log("UserPage component rendering...");

    return <>
        <UserHeader />
        <UserPost likes={1300} replies={432} postImg="./post1.png" postTitle="Wooh! It's working..😵"/>
        <UserPost likes={211} replies={1222} postImg="./post2.png" postTitle="It worked again.. Hurray😏"/>
        <UserPost likes={93} replies={21} postImg="./d.jpg" postTitle="What you say?? Am i inferior to any celebrity?🧐 ......Any competitor💀?" />
        <UserPost likes={1002} replies={983} postTitle="Hacked.." />
    </>


};
export default UserPage;
