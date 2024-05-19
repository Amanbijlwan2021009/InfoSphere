<<<<<<< HEAD
import { Avatar, Divider, Flex, Text } from "@chakra-ui/react";

const Comment = ({ reply, lastReply }) => {
    return (
        <>
            <Flex gap={4} py={2} my={2} w={"full"}>
                <Avatar src={reply.userProfilePic} size={"sm"} />
                <Flex gap={1} w={"full"} flexDirection={"column"}>
                    <Flex w={"full"} justifyContent={"space-between"} alignItems={"center"}>
                        <Text fontSize='sm' fontWeight='bold'>
                            {reply.username}
                        </Text>
                    </Flex>
                    <Text>{reply.text}</Text>
                </Flex>
            </Flex>
            {!lastReply ? <Divider /> : null}
        </>
    );
};

export default Comment;
=======
import { Avatar, Divider, Flex, Text, Image, Box } from "@chakra-ui/react"
import { useState } from "react"
import { BsThreeDots } from "react-icons/bs"
import Actions from "./Actions"

const Comment = ({ comment, userAvatar, createdAt, username, likes, commentImg }) => {
    const [liked, setLiked] = useState(false)

    return <>
        <Flex gap={4} py={2} my={2} w={"full"} >
            <Avatar src={userAvatar} size={"sm"} />

            <Flex gap={1} w={"full"} flexDirection={"column"}>

                <Flex gap={1} w={"full"} justifyContent={"space-between"} alignItems={"center"}>
                    {/* <Text fontSize="sm" fontWeight={"bold"}>Mark Zuckerberg}</Text> */}
                    {/* This is particular Mark , But next will be use to make it live--> */}
                    <Text fontSize="sm" fontWeight={"bold"}>{username}</Text>



                    <Flex gap={2} alignItems={"center"}>
                        <Text fontSize={"sm"} fontWeight={"bold"} color={"gray.light"}>
                            {createdAt}
                        </Text>
                        <BsThreeDots />
                    </Flex>

                </Flex>

                <Text>{comment}</Text>
                {/* Below comment image part , i created it  */}
                {commentImg && (
                    <Box border={"1px solid gray"} borderRadius={4} borderColor={"gray.light"} overflow={"hidden"} w="360px" h="200px">
                        <Image src={commentImg} w="full" h="full" objectFit={"cover"}></Image>
                    </Box>
                )}
                <Actions liked={liked} setLiked={setLiked} />
                <Text fontSize={"sm"} color={"gray.light"} >
                    {likes + (liked ? 1 : 0)} likes
                </Text>

            </Flex>

        </Flex>

        <Divider my={4} />
    </>

}

export default Comment
>>>>>>> 0d00deef4c1f037fa075847f988ac901c685e54f
