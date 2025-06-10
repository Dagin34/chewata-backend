import { generateToken } from "../lib/utils.js"
import User from "../models/user.model.js"
import bcrypt from "bcryptjs"
import cloudinary from "../lib/cloudinary.js"

export const signup = async (req, res) => {
  const { fullName, email, password } = req.body
  try {
    //.. Check if all fields are provided
    if (!fullName || !email || !password) {
      return res.status(400).json({ message: 'Please fill all fields' })
    }

    if (password.length < 6) {
      return res.status(400).json({ message: 'Password must be at least 6 characters long' })
    }

    //.. Check if user already exists
    const user = await User.findOne({ email })
    if (user) {
      return res.status(400).json({ message: 'Email already exists' })
    }

    //.. Hash password
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    const newUser = new User({
      fullName,
      email,
      password: hashedPassword,
    })

    

    if(newUser) {
      //.. Generate JWT token
      generateToken(newUser._id, res)
      
      //.. Save user to the database
      await newUser.save()
      return res.status(201).json({
        _id: newUser._id,
        fullName: newUser.fullName,
        email: newUser.email,
        profilePicture: newUser.profilePicture,
      })
    } else {
      res.status(400).json({ message: "Invalid user data" });
    }
    return res.status(400).json({ message: 'User creation failed' })
  } catch (error) {
    console.error('Error during signup controller:', error)
    res.status(500).json({ message: 'Internal server error' })
  }
}

export const login = async (req, res) => {
  const { email, password } = req.body
  try {
    //.. Check if all fields are provided
    if (!email || !password) {
      return res.status(400).json({ message: 'Please fill all fields' })
    }

    //.. Check if user exists
    const user = await User.findOne({ email })
    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' })
    }

    //.. Check if password is correct
    const isPasswordCorrect = await bcrypt.compare(password, user.password)
    if (!isPasswordCorrect) {
      return res.status(400).json({ message: 'Invalid credentials' })
    }

    //.. Generate JWT token
    generateToken(user._id, res)

    return res.status(200).json({
      _id: user._id,
      fullName: user.fullName,
      email: user.email,
      profilePicture: user.profilePicture,
      bio: user.bio,
    })
  } catch (error) {
    console.error('Error during login controller:', error)
    res.status(500).json({ message: 'Internal server error' })
  }
}

export const logout = async (req, res) => {
  try {
    //.. Clear the JWT token from the cookie
    res.cookie('jwt', '', { maxage: 0 })
    // res.clearCookie('jwt')
    return res.status(200).json({ message: 'Logged out successfully' })
  } catch (error) {
    console.error('Error during logout controller:', error)
    res.status(500).json({ message: 'Internal server error' })
  }
}

export const updateProfile = async (req, res) => {
  const { profilePicture } = req.body
  const userId = req.user._id

  try {
    //.. Check if profile picture is provided
    if (!profilePicture) {
      return res.status(400).json({ message: 'Please provide a profile picture' })
    }

    const uploadResponse = await cloudinary.uploader.upload(profilePicture)
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { profilePicture: uploadResponse.secure_url },
      { new: true, runValidators: true } //.. Gives the after update object... Not before BTW
    )

    if (!updatedUser) {
      return res.status(404).json({ message: 'User not found' })
    }

    res.status(200).json(updatedUser)
  } catch (error) {
    console.error('Error during updateProfile controller:', error)
    res.status(500).json({ message: 'Internal server error' })
  }
}

export const checkAuth = async (req, res) => {
  try {
    res.status(200).json(req.user)
  } catch (error) {
    console.error('Error during checkAuth controller:', error)
    res.status(500).json({ message: 'Internal server error' })
  }
}