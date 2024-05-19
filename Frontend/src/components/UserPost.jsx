<<<<<<< HEAD
import { Avatar } from "@chakra-ui/avatar";
import { Image } from "@chakra-ui/image";
import { Box, Flex, Text } from "@chakra-ui/layout";
import { BsThreeDots } from "react-icons/bs";
import { Link } from "react-router-dom";
import Actions from "./Actions";
import { useState } from "react";

const UserPost = ({ postImg, postTitle, likes, replies }) => {
	const [liked, setLiked] = useState(false);
	return (
		<Link to={"/markzuckerberg/post/1"}>
			<Flex gap={3} mb={4} py={5}>
				<Flex flexDirection={"column"} alignItems={"center"}>
					<Avatar size='md' name='Mark Zuckerberg' src='/zuck-avatar.png' />
					<Box w='1px' h={"full"} bg='gray.light' my={2}></Box>
					<Box position={"relative"} w={"full"}>
						<Avatar
							size='xs'
							name='John doe'
							src='https://bit.ly/dan-abramov'
							position={"absolute"}
							top={"0px"}
							left='15px'
							padding={"2px"}
						/>
						<Avatar
							size='xs'
							name='John doe'
							src='https://bit.ly/sage-adebayo'
							position={"absolute"}
							bottom={"0px"}
							right='-5px'
							padding={"2px"}
						/>
						<Avatar
							size='xs'
							name='John doe'
							src='https://bit.ly/prosper-baba'
							position={"absolute"}
							bottom={"0px"}
							left='4px'
							padding={"2px"}
						/>
					</Box>
				</Flex>
				<Flex flex={1} flexDirection={"column"} gap={2}>
					<Flex justifyContent={"space-between"} w={"full"}>
						<Flex w={"full"} alignItems={"center"}>
							<Text fontSize={"sm"} fontWeight={"bold"}>
								markzuckerberg
							</Text>
							<Image src='/verified.png' w={4} h={4} ml={1} />
						</Flex>
						<Flex gap={4} alignItems={"center"}>
							<Text fontStyle={"sm"} color={"gray.light"}>
								1d
							</Text>
							<BsThreeDots />
						</Flex>
					</Flex>

					<Text fontSize={"sm"}>{postTitle}</Text>
					{postImg && (
						<Box borderRadius={6} overflow={"hidden"} border={"1px solid"} borderColor={"gray.light"}>
							<Image src={postImg} w={"full"} />
						</Box>
					)}

					<Flex gap={3} my={1}>
						<Actions liked={liked} setLiked={setLiked} />
					</Flex>

					<Flex gap={2} alignItems={"center"}>
						<Text color={"gray.light"} fontSize='sm'>
							{replies} replies
						</Text>
						<Box w={0.5} h={0.5} borderRadius={"full"} bg={"gray.light"}></Box>
						<Text color={"gray.light"} fontSize='sm'>
							{likes} likes
						</Text>
					</Flex>
				</Flex>
			</Flex>
		</Link>
	);
};

export default UserPost;
=======
// import {  } from "@chakra-ui/react"
import { Flex, Box, Text } from "@chakra-ui/layout"
import { Avatar, Image } from "@chakra-ui/react"
import { BsThreeDots } from "react-icons/bs"
import Actions from "./Actions"
import { Link } from "react-router-dom"
import { useState } from "react"


const UserPost = ({ likes, replies, postImg, postTitle }) => {
    const [liked, setLiked] = useState(false);
    return (
        <Link to={"/markzuckerberg/post/1"} >

            <Flex gap={5} mb={4} py={5}>
                <Flex flexDirection={"column"} alignItems={"center"}>
                    {/* Creating an dp portion for mark using Avatar */}
                    <Avatar size='md' name="Mark Zuckerberg" src="/zuck-avatar.png" />

                    {/* This creates a vertical line in the left */}
                    <Box w="1px" h={"full"} bg={"gray.light"} my={"3"}></Box> {/*here if i take w value as w={1} , then it is more thicker than "1px"  ,...,I think its just Chakra UI default feature*/}

                    {/* The below box is used to create group of avatar in a traiangular way  */}
                    <Box position={"relative"} w={"full"}>
                        <Avatar size='xs' name="John" src='https://bit.ly/dan-abramov' position={"absolute"} top={"0px"} left={"15px"} padding={"2px"}
                        />
                        <Avatar size='xs' name="kolawole" src='https://bit.ly/tioluwani-kolawole' position={"absolute"} bottom={"0px"} right="-5px" padding={"2px"}
                        />
                        <Avatar size='xs' name="CodeBeast" src='https://bit.ly/code-beast' position={"absolute"} bottom={"0px"} left={"4px"} padding={"2px"}
                        />
                    </Box>


                </Flex>

                {/* The below Flex is used for the horizontal portion right to user dp space , and its main purpose is to move elements column wise */}
                <Flex flex={1} flexDirection={"column"} gap={2}>
                    {/* The below flex is a sub flex inside above flex , and it main purpose is to place 'user name' and the post time like '23hr ago' with space in between  */}
                    <Flex justifyContent={"space-between"} w={"full"}>
                        {/* The below flex is a sub flex inside above flex , purpose to align user and verified tick right next to each other */}
                        <Flex w={"full"} alignItems={"center"}>
                            <Text fontSize={"sm"} fontWeight={"bold"}>
                                Mark Zuckerberg
                            </Text>
                            <Image src='./verified.png' w={"4"} h={"4"} ml={"1"} />
                        </Flex>
                        <Flex gap={4} alignItems={"center"}>
                            <Text fontStyle={"sm"} color={"gray.light"}>1d</Text>
                            <BsThreeDots />
                        </Flex>
                    </Flex>
                    <Text fontSize={"sm"}> {postTitle}.</Text>
                    {/* Below is the post  */}

                    {postImg && (

                        <Box borderRadius={"6"} overflow={"hidden"} border={"1px solid"} borderColor={"gray.light"}>
                            <Image src={postImg} w={"full"} />
                        </Box>
                    )}

                    <Flex gap={3} my={1}>
                        <Actions liked={liked} setLiked={setLiked} />
                    </Flex>
                    <Flex gap={3} alignItems={"center"}>
                        <Text color={"gray.light"} fontSize={"sm"}>{replies} replies</Text>
                        <Box w={0.5} h={0.5} borderRadius={"full"} bg={"gray.light"}></Box>
                        <Text color={"gray.light"} fontSize={"sm"}>{likes} likes</Text>
                    </Flex>

                </Flex>

            </Flex>
        </Link>

    )
}


export default UserPost;

>>>>>>> 0d00deef4c1f037fa075847f988ac901c685e54f
