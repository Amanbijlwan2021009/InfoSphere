// We have created this component so that we can access this toast in anyother file by using useShowToast function only..
// and not writing the toast code again  

import { useToast } from '@chakra-ui/react'

const useShowToast = () => {
    const toast = useToast();

    const showToast = (title, description, status) => {
        toast({
            title, description, status, duaration: "3000", isClosable: "true",
        })
    }

    return showToast

}

export default useShowToast