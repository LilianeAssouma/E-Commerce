import { generateToken } from "../../utils/jwtFunction";
import { hashPassword } from "../../utils/passwordfuncion";
import { User } from "../../models/userModel";
import { transporter } from "../../middleWare/emailCreditentials";
import dotenv from 'dotenv';

export const signup = async (req, res) => {
  try {
    const { email, password } = req.body;
    
    //validate email
    // if (!validator.isEmail(email)) {
    //   return res.status(400).json({
    //     message: "Invalid email format",
    //   });
    // }
    
    const existingUser = await User.findOne({ email: email });

    if (existingUser) {
      return res.status(409).json({
        message: "User already exists",
      });
    }

    let hashedPassword = await hashPassword( password );
    req.body.password = hashedPassword;
    
    let newUser = await User.create(req.body);

    let token = generateToken({
      _id: newUser._id,
    });

    const userProfile = {
      email: newUser.email,
    };

    // sending an email after signup
    const mailOptions = {
      from: "lilyanassoum@gmail.com",
      to: newUser.email,
      subject: "Signup Confirmation",
      html: `
      <p>
  <img src="Logo.png" alt="Vue Connect Logo" style="max-width: 100%; height: auto;">
     </p>
      <p>Dear ${newUser.email},</p>

      <p>Thank you for signing up with Vue Connect! We're excited to have you on board.</p>

      <p>Your account has been successfully created, and you can now log in using the email address: ${newUser.email}.</p>

      <p>If you have any questions or need assistance, feel free to reply to this email or contact our support team at [Your Support Email].</p>

      <p>We appreciate your trust in Vue Connect and look forward to serving you.</p>

      <p>Best regards,<br>Vue Connect</p>
    `,
    };

    console.log("Before sending email");

    await transporter.sendMail(mailOptions); 
   
    res.status(201).json({
      message: "User registered successfully",
      access_token: token,
      user: userProfile,
    });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({
      message: "Internal server error",
    });
  }
};


//SignUp WITH GOOGLE AUTHENTICATION
import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';

passport.serializeUser((user, done) =>{
  done(null, user);
});

passport.deserializeUser((obj, done) =>{
  done(null, obj);
});

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: process.env.GOOGLE_CALLBACK_URL,
    },
    (accessToken, refreshToken, profile, done) => {
      const user = {
        email: profile.emails[0].value,
       
      };

      return done(null, user);
    }
  )
);