import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

dotenv.config();

export const generateAccessToken = (nome) => {
  return (token = jwt.sign(nome, process.env.SECRET, { expiresIn: "1800s" }));
};

// Salt and hash password
export function hashPass(senha) {
  bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash(senha, salt, (err, hash) => {
      return hash;
    });
  });
}
