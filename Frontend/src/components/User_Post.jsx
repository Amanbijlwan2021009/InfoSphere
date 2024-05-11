// import {  } from "@chakra-ui/react"
import { Link,Flex, Box } from "@chakra-ui/layout"
import { Avatar } from "@chakra-ui/react"

const User_Post = () => {
    return (
        <Link to={"/markzuckerberg/post/1"}>

            <Flex gap={3} mb={4} py={5}>
                <Flex flexDirection={"column"} alignItems={"center"}>
                    <Avatar size='md' name="Mark Zuckerberg" src="/zuck-avatar.png" />
                    <Box w="1" h={"full"} bg={"gray.light"} my={"2"}></Box>
                    <Box p={"relative"} w={"full"}></Box>


                </Flex>

            </Flex>
        </Link>

    )
}


export default User_Post;

