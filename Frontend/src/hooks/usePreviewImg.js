<<<<<<< HEAD
import { useState } from "react";
import useShowToast from "./useShowToast";

const usePreviewImg = () => {
	const [imgUrl, setImgUrl] = useState(null);
	const showToast = useShowToast();
	const handleImageChange = (e) => {
		const file = e.target.files[0];
		if (file && file.type.startsWith("image/")) {
			const reader = new FileReader();

			reader.onloadend = () => {
				setImgUrl(reader.result);
			};

			reader.readAsDataURL(file);
		} else {
			showToast("Invalid file type", " Please select an image file", "error");
			setImgUrl(null);
		}
	};
	return { handleImageChange, imgUrl, setImgUrl };
};

export default usePreviewImg;
=======
import { useState } from 'react'
import useShowToast from './useShowToast'

const usePreviewImg = () => {
    const [imgUrl, setImgUrl] = useState(null)
    const showToast = useShowToast()

    const handleImageChange = (e) => {
        const file = e.target.files[0]
        if (file && file.type.startsWith("image/"))//This checks if the file exists and file is an image or not
        {
            const reader = new FileReader()

            reader.onloadend = () => {
                setImgUrl(reader.result)
            }
            reader.readAsDataURL(file)
        } else {
            showToast("Invalid file type", "Please select an image file", "error")
            setImgUrl(null)
        }
    };
    // console.log(imgUrl)

    return { handleImageChange, imgUrl, setImgUrl }
};

export default usePreviewImg
>>>>>>> 0d00deef4c1f037fa075847f988ac901c685e54f
