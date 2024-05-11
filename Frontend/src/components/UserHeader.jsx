import { Box, VStack, Flex, Text, Link } from "@chakra-ui/layout";
import { Avatar, Menu, MenuButton, MenuItem, MenuList, Portal, useToast } from "@chakra-ui/react";
import { BsInstagram } from "react-icons/bs";
import { CgMoreO } from "react-icons/cg";

const UserHeader = () => {

    const toast = useToast();


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

    return (
        // <VStack >
        //     <Box>Box1</Box>
        //     <Box>Box1</Box>
        //     <Box>Box1</Box>
        // </VStack>
        <VStack gap={4} alignItems={"start"}>

            <Flex justifyContent={"space-between"} w={"full"}>
                <Box>
                    <Text fontSize={"2xl"}>
                        Mark Zuckerberg
                    </Text>
                    <Flex gap={2} alignItems={"center"}>
                        <Text fontSize={"sm"}>
                            markzuckerberg
                        </Text>
                        <Text fontSize={"xs"} bg={"gray.dark "}>
                            threads.next
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
                    <Avatar name="Mark Zukerberg"
                        src="/zuck-avatar.png"
                        size={'xl'} />
                </Box>
            </Flex>
            <Text>Co-Founder, Executive Chairman and CEO of Meta Platforms.</Text>

            <Flex w="full " justifyContent={"space-between"}>
                <Flex gap={2} alignItems={"center"}>
                    <Text color={"gray.light"}>3.2K Followers</Text>
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




