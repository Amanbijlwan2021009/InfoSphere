// We have created this component so that we can access this toast in anyother file by using useShowToast function only..
// and not writing the toast code again  

<<<<<<< HEAD
import { useToast } from "@chakra-ui/toast";
import { useCallback } from "react";
=======
import { useToast } from '@chakra-ui/react'
import { useCallback } from 'react';
>>>>>>> 0d00deef4c1f037fa075847f988ac901c685e54f

const useShowToast = () => {
    const toast = useToast();

<<<<<<< HEAD
    const showToast = useCallback(
        (title, description, status) => {
            toast({
                title,
                description,
                status,
                duration: 3000,
                isClosable: true,
            });
        },
        [toast]
    );

    return showToast;
};

export default useShowToast;
=======
    const showToast = useCallback((title, description, status) => {
        toast({
            title, description, status, duaration: "3000", isClosable: "true",
        })
    },[toast])

    return showToast

}

export default useShowToast
>>>>>>> 0d00deef4c1f037fa075847f988ac901c685e54f
