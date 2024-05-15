import {
    Button,
    Flex,
    FormControl,
    FormLabel,
    Heading,
    Input,
    Stack,
    useColorModeValue,
    Avatar,
    Center,
} from '@chakra-ui/react';
import { useRef, useState } from 'react';
import { useRecoilState } from 'recoil';
import userAtom from '../atoms/userAtom';
import usePreviewImg from '../hooks/usePreviewImg';
// import BoxShadow from '../components/Box_Shadow';

export default function UserProfilePage() {

    const [user, setUser] = useRecoilState(userAtom)
    const [inputs, setInputs] = useState({
        name: user.name,
        username: user.username,
        email: user.email,
        bio: user.bio,
        password: "",
    })

    const fileRef = useRef(null)//This is used in the change avatar section , to access input element defined through change avatar 'button'

    const { handleImageChange, imgUrl } = usePreviewImg()

    return (
        <Flex
            align={'center'}
            justify={'center'}
            my={6}
        >
            <Stack
                spacing={4}
                w={'full'}
                maxW={'md'}
                bg={useColorModeValue('white', 'gray.dark')}
                rounded={'xl'}
                // boxShadow={'lg'}
                p={6}
                boxShadow={"30px 15px 150px red"}

            >
                {/* <BoxShadow/> */}
                <Heading lineHeight={1.1} fontSize={{ base: '2xl', sm: '3xl' }}>
                    User Profile Edit
                </Heading>
                <FormControl id="userName">
                    <Stack direction={['column', 'row']} spacing={6}>
                        <Center>
                            <Avatar size="xl" boxShadow="md" src={imgUrl || user.profilePic} />{/*src gives imgUrl if there is otherewise default user.profilePic  */}
                        </Center>

                        <Center w="full">
                            <Button w="full" onClick={() => { fileRef.current.click() }} >Change Avatar</Button>

                            {/* in order to take image  from the file explorer we can do as follow: */}
                            <Input type="file" hidden ref={fileRef} onChange={handleImageChange} />
                        </Center>
                    </Stack>
                </FormControl>
                <FormControl isRequired>
                    <FormLabel>Full name</FormLabel>
                    <Input
                        placeholder="Full Name"
                        _placeholder={{ color: 'gray.500' }}
                        type="text"
                        value={inputs.name}
                        onChange={(e) => setInputs({ ...inputs, name: e.target.value })}
                    />
                </FormControl>
                <FormControl isRequired>
                    <FormLabel>User name</FormLabel>
                    <Input
                        placeholder="User Name"
                        value={inputs.username}
                        onChange={(e) => setInputs({ ...inputs, username: e.target.value })}
                        _placeholder={{ color: 'gray.500' }}
                        type="text"
                    />
                </FormControl>
                <FormControl isRequired>
                    <FormLabel>Email address</FormLabel>
                    <Input
                        placeholder="your-email@example.com"
                        _placeholder={{ color: 'gray.500' }}
                        type="email"
                        value={inputs.email}
                        onChange={(e) => setInputs({ ...inputs, email: e.target.value })}
                    />
                </FormControl>
                <FormControl isRequired>
                    <FormLabel>Bio</FormLabel>
                    <Input
                        placeholder="Your Bio.."
                        _placeholder={{ color: 'gray.500' }}
                        type="text"
                        value={inputs.bio}
                        onChange={(e) => setInputs({ ...inputs, bio: e.target.value })}
                    />
                </FormControl>
                <FormControl isRequired>
                    <FormLabel>Password</FormLabel>
                    <Input
                        placeholder="password"
                        _placeholder={{ color: 'gray.500' }}
                        type="password"
                        value={inputs.password}//this is used to take input??
                        onChange={(e) => setInputs({ ...inputs, password: e.target.value })}
                    />
                </FormControl>
                <Stack spacing={6} direction={['column', 'row']}>
                    <Button
                        bg={'red.400'}
                        color={'white'}
                        w="full"
                        _hover={{
                            bg: 'red.500',
                        }}>
                        Cancel
                    </Button>
                    <Button
                        bg={'green'}
                        color={'white'}
                        w="full"
                        _hover={{
                            bg: 'darkgreen',
                        }}>
                        Submit
                    </Button>
                </Stack>
            </Stack>
        </Flex >
    );
}