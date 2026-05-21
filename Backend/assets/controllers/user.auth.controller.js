import bcrypt from "bcrypt";
import { prisma } from "../config/db.js";
import jwt from "jsonwebtoken";

export const registerUser = async (req, res) => {
  try {
      const { firstName, lastName, email, password, avatar } = req.body;
      const hashedPassword = await bcrypt.hash(password, 11);

      const newUser = {
          firstName, lastName, email, avatar,
          password: hashedPassword
      };

      const createdUser = await prisma.User.create({ data: newUser });

      res.status(201).json({message: "User created successfully", user: createdUser });


  } catch (error) {
      console.log(error);
      
    res.status(500).json({ message: "Error registering user", error });
  }
};
// ***************************************************************

export const loginUser = async (req, res) => {
  try {
    const {email , password}  = req.body;
    
    const findUser = await prisma.User.findUnique({
      where: {
        email: email}
    });

    const isPasswordValid = findUser && await bcrypt.compare(password, findUser.password);

    if (!findUser || !isPasswordValid) {
      res.status(401).json({ message: "Invalid email or password" });
    };

    if (isPasswordValid && findUser) {
      
      const jwtToken = jwt.sign({
        userId: findUser.id,
        email: findUser.email,
        firstName: findUser.firstName,
        lastName: findUser.lastName,
        avatar: findUser.avatar,
        role: findUser.role
      }, process.env.JWT_SECRET, { expiresIn: "1h" },
      )

       res
         .cookie("token", jwtToken, {
           httpOnly: true,
           secure: true, // true in production (HTTPS)
           sameSite: "strict",
           maxAge: 2 * 60 * 60 * 1000, // 2 hours
         })
         .status(200)
         .json({ message: "Login successful" });

    };


  } catch (error) {
    console.log(error);
    
    res.status(500).json({ message: "Error logging in user", error });
  }
}

// ***************************************************************
export const getLoggedInUser = async (req, res) => {
  try {
    const userId = req.user.userId;

    const loggedInUser = await prisma.User.findUnique({
      where:
        { id: userId }
    });

    if (!loggedInUser) {
      res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ user: loggedInUser });
   

  } catch (error) {
    
    console.log(error);
    res.status(500).json({ message: "Error fetching logged in user", error });
  }
};


// ***********************************************************

export const logoutUser = async (req, res) => {
 
  try {
    res.clearCookie("token", "", {
      httpOnly: true,
      secure: true, // true in production (HTTPS)
      sameSite: "strict",
      maxAge: 2 * 60 * 60 * 1000, // 2 hours
    }).status(200).json({ message: " logout suceesfully" });
     
     
     
  } catch (error) {
    console.log(error);

    res.status(500).json({ message: " enable to logout" });
     
     
  };
  


};