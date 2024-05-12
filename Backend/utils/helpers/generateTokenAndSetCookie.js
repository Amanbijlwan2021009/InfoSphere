//This file is used to generate token and cookie

import jwt from 'jsonwebtoken'

const generateTokenAndSetCookie = (userId, res) => {
    const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
        expiresIn: '15 days'
    })//JWT_SECRET is placed inside .env


    res.cookie("jwt", token, {
        httpOnly: true, //This cookie cannot be accessed by the browser... make it more secure

        maxAge: 15 * 24 * 60 * 60 * 1000,//15days

        sameSite: "strict",//save from CSRF attack

    })
    return token;

}

export default generateTokenAndSetCookie;