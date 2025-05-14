import jwt from "jsonwebtoken";

export const generateToken = (user) => {
  return jwt.sign(
    {
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    },
    process.env.JWT_SECRET || "somethingsecret",
    { expiresIn: "30d" }
  );
};

export const isAuth = (req, res, next) => {
  const authorization = req.headers.authorization;
  if (authorization) {
    // Bearer XXXXXX
    const token = authorization.slice(7, authorization.length);
    jwt.verify(token, process.env.JWT_SECRET || "something", (err, decode) => {
      if (err) {
        res.status(401).send({ message: "Invalid Token" });
      }
      req.user = decode;
      next();
    });
  } else {
    res.status(401).send({ message: "There is no token " });
  }
};

export const isAdmin = (req, res, next) => {
  const authorization = req.headers.authorization;
  if (authorization) {
    const token = authorization.slice(7, authorization.length);
    jwt.verify(token, process.env.JWT_SECRET || "something", (err, decode) => {
      if (err) {
        res.status(401).send({ message: "Invalid Token" });
      }
      if (!decode.isAdmin) {
        res.status(401).send({ message: "Only for Administrator" });
      }
      req.user = decode;
      next();
    });
  } else {
    res.status(401).send({ message: "There is no token" });
  }
};
