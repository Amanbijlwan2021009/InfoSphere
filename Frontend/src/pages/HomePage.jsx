// import { Button, Flex } from "@chakra-ui/react"
// import { Link } from "react-router-dom"

// const HomePage = () => {

//     return (
//         <Link to={"/markzuckerberg"}>
//             <Flex w={"full"} justifyContent={"center"}>
//                 <Button mx={"auto"}>Visit Profile Page</Button>
//             </Flex>
//         </Link>

//     )

// }
// export default HomePage;
import { Box, Flex, Spinner } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import useShowToast from "../hooks/useShowToast";
import Post from "../components/Post";
import { useRecoilState } from "recoil";
import postsAtom from "../atoms/postAtoms";
import SuggestedUsers from "../components/SuggestedUsers";

const HomePage = () => {
    const [posts, setPosts] = useRecoilState(postsAtom);
    const [loading, setLoading] = useState(true);
    const showToast = useShowToast();
    useEffect(() => {
        const getFeedPosts = async () => {
            setLoading(true);
            setPosts([]);
            try {
                const res = await fetch("/api/posts/feed");
                const data = await res.json();
                if (data.error) {
                    showToast("Error", data.error, "error");
                    return;
                }
                console.log(data);
                setPosts(data);
            } catch (error) {
                showToast("Error", error.message, "error");
            } finally {
                setLoading(false);
            }
        };
        getFeedPosts();
    }, [showToast, setPosts]);

    return (
        <Flex gap='10' alignItems={"flex-start"}>
            <Box flex={70}>
                {!loading && posts.length === 0 && <h1>Follow some users to see the feed</h1>}
                {/* Above message will be shown when the user has not followed anyone yet and he/she has just created an account */}

                {loading && (
                    <Flex justify='center'>
                        <Spinner size='xl' />
                    </Flex>
                )}

                {posts.map((post) => (
					<Post key={post._id} post={post} postedBy={post.postedBy} />
				))}
                {/* {Array.isArray(posts) && posts.map((post) => (
                    <Post key={post._id} post={post} postedBy={post.postedBy} />
                ))} */}
            </Box>
            <Box
                flex={30}
                display={{
                    base: "none",
                    md: "block",
                }}
            >
                <SuggestedUsers />
            </Box>
        </Flex>
    );
};

export default HomePage;
