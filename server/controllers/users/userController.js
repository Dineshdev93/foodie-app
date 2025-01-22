const bcrypt = require("bcryptjs");
const userDb = require("../../modals/userModal/userSchema");
const cloudinary = require("../../cloudinary/cloudinary");
const jwt = require("jsonwebtoken");
const secret_key = process.env.SECRET_KEY;
const transporter = require("../../helper");
// Register user logic
exports.Register = async (req, res) => {
  const file = req.file ? req.file.path : "";

  const { firstname, lastname, email, password } = req.body;

  if (!firstname || !lastname || !email || !password) {
    res.status(400).json({ status: 400, Error: "All feilds required" });
  }
  try {
    const preuser = await userDb.findOne({ email: email });
    if (preuser) {
      res.status(400).json({ msg: "User already exist" });
    } else {
      const cloudinary_path = await cloudinary.uploader.upload(file);

      const hashpassword = await bcrypt.hash(password, 12);

      const userdata = new userDb({
        firstname,
        lastname,
        email,
        userProfile: cloudinary_path.secure_url,
        password: hashpassword,
      });
      await userdata.save();
      res.status(200).json({ msg: "User registered successfully", userdata });
    }
  } catch (error) {
    console.log("catch block error", error);

    res.status(500).json({ status: 500, Error: "Bad request" });
  }
};
//  Log in api
exports.Login = async (req, res) => {
  const { email, password } = req.body;

  const userValid = await userDb.findOne({ email: email });
  try {
    if (userValid) {
      const isMatch = await bcrypt.compare(password, userValid.password);
      if (!isMatch) {
        res.status(400).json({ msg: "Invalid Password" });
      } else {
        //generate token
        const token = jwt.sign(
          { id: userValid._id, email: userValid.email },
          secret_key,
          { expiresIn: "1d" }
        );
        userValid.tokens = userValid.tokens.concat({ token });
        await userValid.save(
          res.status(200).json({ msg: "Successfully login", token })
        );
      }
    } else {
      res.status(400).json({ msg: "Invalid user details" });
    }
  } catch (error) {
    console.log("catch block error", error);
    res.status(500).json({ status: 500, Error: "Bad request" });
  }
};
// Get logged user details
exports.verifyUSer = async (req, res) => {
  try {
    const verifyUSer = await userDb.findOne({ _id: req.userid });
    res.status(200).json(verifyUSer);
  } catch (error) {
    console.log("catch block error", error);
    res.status(500).json({ status: 500, Error: "Bad request" });
  }
};

// log out api
exports.logout = async (req, res) => {
    const authtoken = req.headers.authorization ; 

    const currenttoken = await userDb.find()

};

// for forgot password  send email
exports.forgotpassword = async (req, res) => {
  const { email } = req.body;
  if (!email) {
    res.status(400).json({ error: "Please enter email" });
  }
  try {
    const userfind = await userDb.findOne({ email: email });
    if (!userfind) {
      res.status(400).json({ error: "This user is not exist" });
    } else {
      // Generate token
      const generateNewtoken = jwt.sign({ _id: userfind._id }, secret_key, {
        expiresIn: "4m",
      });
      // save this token in database
      const settoken = await userDb.findByIdAndUpdate(
        { _id: userfind._id },
        { verifytoken: generateNewtoken },
        { new: true }
      );
      if (settoken) {
        const mailoptions = {
          from: process.env.email,
          to: email,
          subject: "Sending email for forgot password",
          html: `
                       <h2>Password Reset Request</h2>
            <p>Hi ${userfind.firstname},</p>
            <p>You requested to reset your password. Please click on the link below to reset your password:</p>
            <a href="http://192.168.168.13:3000/resetpassword/${userfind.id}/${settoken.verifytoken}" style="display: inline-block; padding: 10px 20px; margin: 20px 0; font-size: 16px; color: white; background-color: #4CAF50; text-decoration: none; border-radius: 5px;">Reset Password</a>
            <p>If you did not request this, please ignore this email.</p>
            <p>Thank you,</p>
            <p>Your Company Name</p>
                   `,
        };
        transporter.sendMail(mailoptions, (error, info) => {
          if (error) {
            console.log("error", error);
            res.status(400).json({ error: "email not send" });
          } else {
            console.log("Emial sent", info.response);
            res.status(200).json({ message: "Email Sent sucessfully" });
          }
        });
      } else {
        res.status(400).json({ status: 400, Error: "Invalid user" });
      }
    }
  } catch (error) {
    console.log("catch block error", error);
    res.status(500).json({ status: 500, Error: "Bad request" });
  }
};

// get forgot password details
exports.forgotpassdetails = async (req, res) => {
  const { id, token } = req.params;
  try {
    const validUser = await userDb.findOne({ _id: id, verifytoken: token });

    const verifytoken = jwt.verify(token, secret_key);

    if (validUser && verifytoken._id) {
      res.status(200).json({ msg: "valid user" });
    } else {
      res.status(400).json({ msg: "Link expired" });
    }
  } catch (error) {
    console.log(`catch block error ${error}`);

    res.status(500).json({ error: "Bad request" });
  }
};

exports.resetPassword = async (req, res) => {
  const { id, token } = req.params;
  const { password } = req.body;

  try { 
    const validUser = await userDb.findOne({ _id: id, verifytoken: token });

    const verifyToken = jwt.verify(token, secret_key);

    if (validUser && verifyToken._id) {
      const newpassword = await bcrypt.hash(password, 12);

      const setUsernewPassword = await userDb.findByIdAndUpdate(
        { _id: id },
        { password: newpassword },
        { new: true }
      );

      res
        .status(200)
        .json({ message: "password sucessfully updated", setUsernewPassword });
    } else {
      res.status(400).json({ error: "link expire" });
    }
  } catch (error) {
    console.log(res, "Token expired !", error);
    res.status(500).json({ error: error });
  }
};
