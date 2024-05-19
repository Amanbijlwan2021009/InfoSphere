<<<<<<< HEAD
import { useEffect, useState } from "react";
import UserHeader from "../components/UserHeader";
import { useParams } from "react-router-dom";
import useShowToast from "../hooks/useShowToast";
import { Flex, Spinner } from "@chakra-ui/react";
import Post from "../components/Post";
import useGetUserProfile from "../hooks/useGetUserProfile";
import { useRecoilState } from "recoil";
import postsAtom from "../atoms/postsAtom";

const UserPage = () => {
	const { user, loading } = useGetUserProfile();
	const { username } = useParams();
	const showToast = useShowToast();
	const [posts, setPosts] = useRecoilState(postsAtom);
	const [fetchingPosts, setFetchingPosts] = useState(true);

	useEffect(() => {
		const getPosts = async () => {
			if (!user) return;
			setFetchingPosts(true);
			try {
				const res = await fetch(`/api/posts/user/${username}`);
				const data = await res.json();
				console.log(data);
				setPosts(data);
			} catch (error) {
				showToast("Error", error.message, "error");
				setPosts([]);
			} finally {
				setFetchingPosts(false);
			}
		};

		getPosts();
	}, [username, showToast, setPosts, user]);

	if (!user && loading) {
		return (
			<Flex justifyContent={"center"}>
				<Spinner size={"xl"} />
			</Flex>
		);
	}

	if (!user && !loading) return <h1>User not found</h1>;

	return (
		<>
			<UserHeader user={user} />

			{!fetchingPosts && posts.length === 0 && <h1>User has not posts.</h1>}
			{fetchingPosts && (
				<Flex justifyContent={"center"} my={12}>
					<Spinner size={"xl"} />
				</Flex>
			)}

			{posts.map((post) => (
				<Post key={post._id} post={post} postedBy={post.postedBy} />
			))}
		</>
	);
};

export default UserPage;
=======
// import { UserHeader } from "../components/UserHeader.jsx";
import { useEffect, useState } from "react";
import UserHeader from "../components/UserHeader";
// import UserPost from "../components/UserPost";
import { useParams } from "react-router-dom";
import useShowToast from "../hooks/useShowToast";
import { Flex, Image, Spinner, Text } from "@chakra-ui/react";
import Post from "../components/Post";
import postsAtom from "../atoms/postAtoms";
import { useRecoilState } from "recoil";
import useGetUserProfile from "../hooks/useGetUserProfile";


const UserPage = () => {
    // console.log("UserPage component rendering...");

    const [user, setUser] = useState(null)
    const { username } = useParams()
    const showToast = useShowToast
    const [loading, setLoading] = useState(true)
    const [posts, setPosts] = useRecoilState(postsAtom);
    const [fetchingPosts, setFetchingPosts] = useState(true);

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
                showToast("Error", error.message, "error")
            }
            finally {
                setLoading(false)
            }
        }
        const getPosts = async () => {
            setFetchingPosts(true)

            try {
                const res = await fetch(`/api/posts/user/${username}`)
                const data = res.json()
                console.log(data)

                setPosts(data)
            } catch (error) {
                showToast("Error", error.message, "error")
                setPosts([])

            }
            finally {
                setFetchingPosts(false)
            }

        }
        getUser();
        getPosts()
    }, [username, showToast]);


    if (!user && loading) {
        return (
            <Flex justifyContent={"center"} >
                <Spinner size={"xl"} />
            </Flex>
        )
    }

    //below if will execute if the user not exist 
    if (!user && !loading) {
        return (
            <Flex justifyContent={"center"} alignItems={"center"} height={"80vh"} flexDirection={"column"} gap={4}>
                <Text fontSize={"45px"}>404</Text>
                <Image src="/whoAreYou.gif" borderRadius="90px" boxShadow={"5px 5px 50px pink"} />
            </Flex>
        )
    };

    return (
        <>
            <UserHeader user={user} />
            {/* <UserPost likes={1300} replies={432} postImg="./post1.png" postTitle="Wooh! It's working..😵" />
            <UserPost likes={211} replies={1222} postImg="./post2.png" postTitle="It worked again.. Hurray😏" />
            <UserPost likes={93} replies={21} postImg="./d.jpg" postTitle="What you say?? Am i inferior to any celebrity?🧐 ......Any competitor💀?" />
            <UserPost likes={1002} replies={983} postTitle="Hacked.." /> */}

            {/* //If no post then the below message will display */}
            {!fetchingPosts && posts.length === 0 && <h1>User has not posts.</h1>}
            {fetchingPosts && (
                <Flex justifyContent={"center"} my={12}>
                    <Spinner size={"xl"} />
                </Flex>
            )}

            {/* If we are not fetching post , means that we already fetched post then below part will execute */}
            {posts.map((post) => (
                <Post key={post._id} post={post} postedBy={post.postedBy} />
            ))}

        </>
    )

};

export default UserPage;  
>>>>>>> 0d00deef4c1f037fa075847f988ac901c685e54f
