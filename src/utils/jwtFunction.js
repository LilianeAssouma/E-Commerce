import jwt from "jsonwebtoken";
export const generateToken = (data) => {
  let Token = jwt.sign(data, "hello", { expiresIn: "3h"});
  return Token;
};