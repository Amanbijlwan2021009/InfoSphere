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
import useShowToast from '../hooks/useShowToast';

export default function UserProfilePage() {

    const [user, setUser] = useRecoilState(userAtom)
    const [inputs, setInputs] = useState({
        name: user.name,
        username: user.username,
        email: user.email,
        bio: user.bio,
        password: "",
    });

    const fileRef = useRef(null)//This is used in the change avatar section , to access input element defined through change avatar 'button'
    const [updating, setUpadting] = useState(false)

    const { handleImageChange, imgUrl } = usePreviewImg();

    const showToast = useShowToast()

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (updating) return
        setUpadting(true);

        try {
            const res = await fetch(`/api/users/update/${user._id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ ...inputs, profilePic: imgUrl }),
            })

            const data = await res.json()//updated user object
            if (data.error) {
                showToast("Error", data.error, "error")
                return;
            }

            showToast("Success", "Profile Updated Successfully", "success")
            setUser(data)

            localStorage.setItem("user-threads", JSON.stringify(data))

        } catch (error) {
            showToast("Error", error, "error");
        }
        finally {
            setUpadting(false)
        }
    }

    return (
        <form onSubmit={handleSubmit}>

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
                    <FormControl >
                        <FormLabel>Full name</FormLabel>
                        <Input
                            placeholder="Full Name"
                            _placeholder={{ color: 'gray.500' }}
                            type="text"
                            value={inputs.name}
                            onChange={(e) => setInputs({ ...inputs, name: e.target.value })}
                        />
                    </FormControl>
                    <FormControl >
                        <FormLabel>User name</FormLabel>
                        <Input
                            placeholder="User Name"
                            value={inputs.username}
                            onChange={(e) => setInputs({ ...inputs, username: e.target.value })}
                            _placeholder={{ color: 'gray.500' }}
                            type="text"
                        />
                    </FormControl>
                    <FormControl >
                        <FormLabel>Email address</FormLabel>
                        <Input
                            placeholder="your-email@example.com"
                            _placeholder={{ color: 'gray.500' }}
                            type="email"
                            value={inputs.email}
                            onChange={(e) => setInputs({ ...inputs, email: e.target.value })}
                        />
                    </FormControl>
                    <FormControl >
                        <FormLabel>Bio</FormLabel>
                        <Input
                            placeholder="Your Bio.."
                            _placeholder={{ color: 'gray.500' }}
                            type="text"
                            value={inputs.bio}
                            onChange={(e) => setInputs({ ...inputs, bio: e.target.value })}
                        />
                    </FormControl>
                    <FormControl >
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
                            }}
                            type='submit'
                            isLoading={updating}>
                            Submit
                        </Button>
                    </Stack>
                </Stack>
            </Flex >
        </form>
    );
}