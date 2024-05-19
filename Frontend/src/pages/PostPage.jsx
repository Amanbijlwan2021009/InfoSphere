<<<<<<< HEAD
import { Avatar, Box, Button, Divider, Flex, Image, Spinner, Text } from "@chakra-ui/react";
import Actions from "../components/Actions";
import { useEffect } from "react";
import Comment from "../components/Comment";
import useGetUserProfile from "../hooks/useGetUserProfile";
import useShowToast from "../hooks/useShowToast";
import { useNavigate, useParams } from "react-router-dom";
import { formatDistanceToNow } from "date-fns";
import { useRecoilState, useRecoilValue } from "recoil";
import userAtom from "../atoms/userAtom";
import { DeleteIcon } from "@chakra-ui/icons";
import postsAtom from "../atoms/postsAtom";

const PostPage = () => {
	const { user, loading } = useGetUserProfile();
	const [posts, setPosts] = useRecoilState(postsAtom);
	const showToast = useShowToast();
	const { pid } = useParams();
	const currentUser = useRecoilValue(userAtom);
	const navigate = useNavigate();

	const currentPost = posts[0];

	useEffect(() => {
		const getPost = async () => {
			setPosts([]);
			try {
				const res = await fetch(`/api/posts/${pid}`);
				const data = await res.json();
				if (data.error) {
					showToast("Error", data.error, "error");
					return;
				}
				setPosts([data]);
			} catch (error) {
				showToast("Error", error.message, "error");
			}
		};
		getPost();
	}, [showToast, pid, setPosts]);

	const handleDeletePost = async () => {
		try {
			if (!window.confirm("Are you sure you want to delete this post?")) return;

			const res = await fetch(`/api/posts/${currentPost._id}`, {
				method: "DELETE",
			});
			const data = await res.json();
			if (data.error) {
				showToast("Error", data.error, "error");
				return;
			}
			showToast("Success", "Post deleted", "success");
			navigate(`/${user.username}`);
		} catch (error) {
			showToast("Error", error.message, "error");
		}
	};

	if (!user && loading) {
		return (
			<Flex justifyContent={"center"}>
				<Spinner size={"xl"} />
			</Flex>
		);
	}

	if (!currentPost) return null;
	console.log("currentPost", currentPost);

	return (
		<>
			<Flex>
				<Flex w={"full"} alignItems={"center"} gap={3}>
					<Avatar src={user.profilePic} size={"md"} name='Mark Zuckerberg' />
					<Flex>
						<Text fontSize={"sm"} fontWeight={"bold"}>
							{user.username}
						</Text>
						<Image src='/verified.png' w='4' h={4} ml={4} />
					</Flex>
				</Flex>
				<Flex gap={4} alignItems={"center"}>
					<Text fontSize={"xs"} width={36} textAlign={"right"} color={"gray.light"}>
						{formatDistanceToNow(new Date(currentPost.createdAt))} ago
					</Text>

					{currentUser?._id === user._id && (
						<DeleteIcon size={20} cursor={"pointer"} onClick={handleDeletePost} />
					)}
				</Flex>
			</Flex>

			<Text my={3}>{currentPost.text}</Text>

			{currentPost.img && (
				<Box borderRadius={6} overflow={"hidden"} border={"1px solid"} borderColor={"gray.light"}>
					<Image src={currentPost.img} w={"full"} />
				</Box>
			)}

			<Flex gap={3} my={3}>
				<Actions post={currentPost} />
			</Flex>

			<Divider my={4} />

			<Flex justifyContent={"space-between"}>
				<Flex gap={2} alignItems={"center"}>
					<Text fontSize={"2xl"}>👋</Text>
					<Text color={"gray.light"}>Get the app to like, reply and post.</Text>
				</Flex>
				<Button>Get</Button>
			</Flex>

			<Divider my={4} />
			{currentPost.replies.map((reply) => (
				<Comment
					key={reply._id}
					reply={reply}
					lastReply={reply._id === currentPost.replies[currentPost.replies.length - 1]._id}
				/>
			))}
		</>
	);
};

export default PostPage;
=======
import { Flex, Avatar, Text, Image, Box, Divider, Button } from "@chakra-ui/react";
import { BsThreeDots } from "react-icons/bs";
import Actions from "../components/Actions"
import Comment from "../components/Comment"
import { useState } from "react"
import postsAtom from "../atoms/postAtoms";

const PostPage = () => {
    const [liked, setLiked] = useState(false);
    return <>
        <Flex>
            {/* Below Flex contains avatar , name and verified img */}
            <Flex w={"full"} alignItems={"center"} gap={5}>
                <Avatar src="/zuck-avatar.png" size={"md"} name={"Mark Zuckerberg"} />
                <Flex>
                    <Text fontSize={'sm'} fontWeight={"bold"}>markzuckerberg</Text>
                    <Image src="/verified.png" w="4" h="4" ml="2" />
                </Flex>
            </Flex>
            {/* Below Flex contain post duration and 3 dots  */}
            <Flex gap={4} alignItems={"center"}>
                <Text color={"gray.light"} fontSize={"sm"}>1d</Text>
                <BsThreeDots cursor={"pointer"} />
            </Flex>

        </Flex>
        <Text my={3}>Our next CEO..😂😂</Text>
        <Box borderRadius={"6"} overflow={"hidden"} border={"1px solid"} borderColor={"gray.light"}>
            <Image src="/jetha_golgapa.jpg" w={"full"} />
        </Box>

        <Flex gap={2} my={3}>
            <Actions liked={liked} setLiked={setLiked} />
        </Flex>
        <Flex gap={2} alignItems={"center"}>
            <Text color={"gray.light"} fontSize={"sm"}>123 replies</Text>

            <Box borderRadius={"full"} w="0.5" h="0.5" bg={"gray.light"}></Box>

            {/* Fixed like count below: */}
            {/* <Text color={"gray.light"} fontSize={"sm"}>
                1221 likes
            </Text> */}
            {/* Resposive like at some extent till this video is like below */}
            <Text color={"gray.light"} fontSize={"sm"}>
                {200 + (liked ? 1 : 0)} likes
            </Text>
        </Flex>

        <Divider my={4} />

        <Flex justifyContent={"space-between"}>
            <Flex gap={2} alignItems={"center"}>
                <Text fontSize={"2xl"}>👋</Text>
                <Text color={"gray.light"}>Get the app to like, reply and post.</Text>
            </Flex>
            <Button>Get</Button>
        </Flex>

        <Divider my={4} />

        <Comment
            userAvatar="/jetha_face.jpeg"
            username="जलेबी फाफड़ा"
            likes={100}
            // comment="Looks really good!"
            commentImg={"/tera_to.jpg"}
            createdAt="2d"

        />
        <Comment
            userAvatar="https://bit.ly/tioluwani-kolawole"
            username="Anonymous"
            likes={10}
            comment="Padhle Bhai 😪"
            createdAt="1hr"
        />
        <Comment
            userAvatar="/jetha_face.jpeg"
            username="जलेबी फाफड़ा"
            likes={1}
            comment="abhi हैप्लिकॉप्टर nikalta hu"
            createdAt="1d"
        />




    </>

};

export default PostPage
>>>>>>> 0d00deef4c1f037fa075847f988ac901c685e54f
