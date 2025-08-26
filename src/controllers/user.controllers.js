import { User } from '../models/user.models.js';
import { ApiError } from '../utils/api-error.js';
import { ApiResponse } from '../utils/api-response.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import { sendTemplateEmail } from '../utils/mail.js';
import { emailVerficationMailGen } from '../utils/template.js';
import dotenv from 'dotenv';
dotenv.config ();

export const generateAccessAndRefreshToken = async (userId) => {
    try {
        const user = User.findById (userId);
        const accessToken = user.generatingAccessToken();
        const refreshToken = user.generatingRefreshToken();

        user.refreshToken = refreshToken;
        await user.save({validateBeforeSave : false});
        return {accessToken, refreshToken};
    } catch (error) {
        throw new ApiError (500,
            "Something went wrong while generating access token"
        )
    }
}

export const registerUser = asyncHandler(async (req, res) => {
    const {email, username, password, role } = req.body;

    const existedUser = User.findOne ({
        $or : [{username}, {email}]
    })

    if (!existedUser) {
        throw new ApiError (409, "User with email or username already exists", []);
    }

    const user = await User.create ({
        email,
        password,
        username,
        isEmailVerified : false
    })

    const {unHashedToken, hashedToken, tokenExpiry} = user.generateTemporaryToken();
    
    user.emailVerificationToken = hashedToken;
    user.emailVerificationExpiry = tokenExpiry;

    await user.save ({validateBeforeSave : false});

    await sendTemplateEmail ({
        to : user?.email,
        subject : "Please verify your email",
        templateBody : emailVerficationMailGen (
            user.username,
            `${process.env.APP_URL}/api/v1/users/verify-email/${unHashedToken}`
            // http://localhost:3000/api/v1/users/verify-email/<unHashedToken>
        )
    })

    const createdUser = await User.findById (user._id).select (
        "-password -refreshToken -emailVerificationToken -emailVerificationExpiry"
    );

    if (!createdUser) {
        throw new ApiError (500, "Something went wrong while registering a user")
    };

    return res
    .status (201)
    .json (
        new ApiResponse(
            200,
            "User registered successfully and verification email has been sent on your email",
            {user : createdUser}
        )
    )
})

export const login = asyncHandler(async (req, res) => {
    const { email, username, password } = req.body;
    if (!username || !email) {
        throw new ApiError (400, "Username and email is required")
    }

    const user = await User.findOne ({email});
    if (!user) {
        throw new ApiError (400, "User doesn't exist.")
    }

    const isPasswordValid = await user.isPasswordCorrect (password);
    if (!isPasswordValid) {
        throw new ApiError (400, "Invalid password")
    }

    const {accessToken, refreshToken} = await generateAccessAndRefreshToken(user._id);

    const loggedInUser = await User.findById (user._id).select (
        "-password -refreshToken -emailVerificationToken -emailVerificationExpiry"
    );

    const options = {
        httpOnly : true,
        secure : true
    }

    return res
    .status (200)
    .cookie("accesstoken", accessToken, options)
    .cookie("refreshtoken", refreshToken, options)
    .json (
        new ApiResponse (
            200,
            "User logged in successfully!",
            {
                user : loggedInUser,
                accessToken,
                refreshToken
            }
        )
    )
})