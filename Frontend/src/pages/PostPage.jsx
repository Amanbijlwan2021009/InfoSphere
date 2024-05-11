import { Flex, Avatar, Text, Image, Box, Divider, Button } from "@chakra-ui/react";
import { BsThreeDots } from "react-icons/bs";
import Actions from "../components/Actions"
import Comment from "../components/Comment"
import { useState } from "react"

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