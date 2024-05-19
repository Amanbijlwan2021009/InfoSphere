<<<<<<< HEAD
import { atom } from "recoil";

const userAtom = atom({
    key: "userAtom",
    default: JSON.parse(localStorage.getItem("user-threads")),
    // default value for the user will be whatever there is in the local storage 
});

export default userAtom;
=======
import { atom } from "recoil"
const userAtom = atom({
    key: "userAtom",

    default: JSON.parse(localStorage.getItem('user-threads'))//default value for the user will be whatever there is in the local storage 
})

export default userAtom;
>>>>>>> 0d00deef4c1f037fa075847f988ac901c685e54f
