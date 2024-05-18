import { Box, VStack, Flex, Text, Link } from "@chakra-ui/layout";
import { Avatar, Menu, MenuButton, MenuItem, MenuList, Portal, useToast, Button } from "@chakra-ui/react";
import { BsInstagram } from "react-icons/bs";
import { CgMoreO } from "react-icons/cg";
import { useRecoilValue } from "recoil";
import userAtom from "../atoms/userAtom";
import { Link as RouterLink } from 'react-router-dom'
import { useState } from "react";
import useShowToast from "../hooks/useShowToast";

const UserHeader = ({ user }) => {

    const toast = useToast();
    const currentUser = useRecoilValue(userAtom)//this is a logged in user 

    //variable created for Follow Unfollow button shown to user accordingly 
    const [following, setFollowing] = useState(user.followers.includes(currentUser?._id))//if user is following the current user then setFollowing to true else false

    const [updating, setUpdating] = useState(false)

    const showToast = useShowToast()

    const copyURL = () => {
        const currentURL = window.location.href;
        navigator.clipboard.writeText(currentURL).then(() => {
            toast({
                title: 'Link Copied.',
                description: "Profile Link Copied..",
                status: 'success',
                duration: 3000,
                isClosable: true,
            });
        });

    }

    //Follow Unfollow 
    const handleFollowUnfollow = async () => {
        if (!currentUser) {
            showToast("Error", 'Please Login to follow', 'error')
            return;
        }
        if(updating) return
        setUpdating(true);

        try {
            const res = await fetch(`/api/users/follow/${user._id}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
            })

            const data = await res.json()
            if (data.error) {
                showToast("Error", data.error, "error")
                return;
            }

            if (following) {
                showToast("Success", `Unfollowed ${user.name}`, "success")
                user.followers.pop()//this gonna decrement the followers by 1
            }
            else {
                showToast("Success", `Followed ${user.name}`, "success")
                user.followers.push(currentUser?._id);//Simulate adding the followers
            }


            setFollowing(!following)//this change state , if following then unfollow button will be shown and vice versa
            console.log(data)
        } catch (error) {
            showToast("Error", error, "error")
        }
        finally {
            setUpdating(false)
        }
    }

    return (
        // <VStack >
        //     <Box>Box1</Box>
        //     <Box>Box1</Box>
        //     <Box>Box1</Box>
        // </VStack>
        <VStack gap={4} alignItems={"start"}>

            <Flex justifyContent={"space-between"} w={"full"}>
                <Box>
                    <Text fontSize={"4xl"}>
                        {/* Mark Zuckerberg */}
                        {user.name}
                    </Text>

                    <Flex gap={9} alignItems={"center"}>
                        <Text fontSize={"sm"}>
                            {/* markzuckerberg */}
                            {user.username}
                        </Text>
                        <Text fontSize={"xs"} bg={"gray.dark "} >
                            InfoSphere.net
                        </Text>
                    </Flex>
                </Box>
                <Box>
                    {/* To make avatar below responsive i can do changes with its size as :: */}
                    {/* <Avatar name="Mark Zuckerberg" src="zuck-avatar.png" size={{
                        base: "lg",
                        md: "xl",
                        lg: "2xl",
                        
                    }} /> */}
                    {user.profilePic && (
                        <Avatar name={user.name}
                            src={user.profilePic}
                            size={'xl'} />
                    )}
                    {/* if user hasve a profile pic then avatar block will be invoked */}

                    {!user.profilePic && (
                        <Avatar name={user.name}
                            src="https://bit.ly/broken-link"
                            size={'xl'} />
                    )}

                </Box>
            </Flex>
            <Text>
                {/* Co-Founder, Executive Chairman and CEO of Meta Platforms. */}
                {user.bio}
            </Text>

            {currentUser._id === user._id && (
                <Link as={RouterLink} to="/update">
                    <Button size={"sm"}> Update Profile</Button>

                </Link>
            )}
            {currentUser._id !== user._id && (
                <Button size={"sm"} onClick={handleFollowUnfollow} isLoading={updating}>
                    {following ? "Unfollow" : "Follow"}

                </Button>

            )}

            <Flex w="full " justifyContent={"space-between"}>
                <Flex gap={2} alignItems={"center"}>
                    <Text color={"gray.light"}>{user.followers.length} Followers</Text>
                    <Box w="1" h="1" bg={"gray.light"} borderRadius={"full"}></Box>
                    <Link color={"gray.light"}> Instagram.com </Link>
                </Flex>
                <Flex >
                    <Box className="icon-insta-container">
                        <BsInstagram size={"24px"} cursor={"pointer"} bg={"gray.light"} />
                    </Box>
                    <Box m={"1"}></Box>
                    <Box className="icon-moreinfo-container">
                        <Menu>
                            <MenuButton>
                                <CgMoreO size={"24px"} cursor={"pointer"} bg={"gray.light"} />
                            </MenuButton>

                            <Portal>
                                <MenuList bg={"gray.dark"}>
                                    <MenuItem bg={"gray.dark"} onClick={copyURL}>Copy Link</MenuItem>
                                </MenuList>

                            </Portal>
                        </Menu>
                    </Box>

                </Flex>

            </Flex>

            <Flex w={"full"}>
                <Flex flex={1} borderBottom={"1.5px solid white"} cursor={"pointer"} justifyContent={"center"} pb="3">
                    <Text fontWeight={"bold"}>Threads</Text>
                </Flex>
                <Flex flex={1} borderBottom={"1.5px solid gray"} color={"gray.light"} cursor={"pointer"} justifyContent={"center"} pb="3">
                    <Text fontWeight={"bold"}>Replies</Text>
                </Flex>
            </Flex>



        </VStack>
    );
};

export default UserHeader;




