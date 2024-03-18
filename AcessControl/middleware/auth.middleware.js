import JWT from "jsonwebtoken";
import userModel from "../models/user.model.js";

// Protected Routes token base
// export const requireSignIn = async (req, res, next) => {
//     try {
//       const token = req.headers;
//       console.log(token);
//       const decode = JWT.verify(
//         req.headers.authorization,
//         process.env.JWT_SECRET
//       );
//       req.user = decode;
//       next();
//     } catch (error) {
//       console.log(error);
//     }
//   };
  export const requireSignIn = async (req, res, next) => {
    try {
        const token = req.header('Authorization');
        console.log(token);
        if (!token) {
            return res.status(401).json({ error: 'Unauthorized - Token not provided' });
        }
      JWT.verify(token, process.env.JWT_SECRET, (err, user) => {
            if (err) {
                return res.status(403).json({ error: 'Forbidden - Invalid token' });
            }
            user = req.user._id;
            user = req.user.role;
            next();
        });
    }
    catch (error) {
      console.log(error)
        res.status(500).send({
            message: "Internal Server Error",
            error: error.message,
        })
    }
}
 