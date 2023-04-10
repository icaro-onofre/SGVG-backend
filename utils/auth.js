import dotenv from "dotenv";
import jwt from "jsonwebtoken";

dotenv.config();

function authenticateToken(req, res, next) {
  const authHeader = req.get("Authorization");
  const token = authHeader && authHeader.split(" ")[1];

  if (token == null) return res.sendStatus(401);

  jwt.verify( token, process.env.SECRET, (err, token) => {
    console.log(err);

    if (err) return res.sendStatus(403);

    req.user = token;

    next();
  });
}
export default authenticateToken;
