import { verifyToken } from "../utils/jwt.js"; // adjust path as needed


const validateToken = (req, res, next) => {
  const accessToken =
    req.cookies.accessToken || req.headers["authorization"]?.split(" ")[1];

  if (!accessToken) {
    return res.status(401).json({ error: "Access token is missing" });
  }

  try {
    const validToken = verifyToken(accessToken, "access"); // assuming verifyToken expects token and type ("access" or "refresh")

    if (!validToken) {
      return res.status(401).json({ error: "Invalid or expired token" });
    }

    req.authenticated = true;
    req.user = validToken; // attach decoded token info to req for use in routes
    next();
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

export default validateToken;
