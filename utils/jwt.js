import pkg from 'jsonwebtoken';
const { sign, verify } = pkg;

const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET || "yourAccessSecret";
const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET || "yourRefreshSecret";

export const createTokens = (user) => {
  const accessToken = sign(
    { employeeId: user.employeeId, role: user.role },
    ACCESS_TOKEN_SECRET,
    { expiresIn: "30m" }
  );
  const refreshToken = sign(
    { employeeId: user.employeeId, role: user.role },
    REFRESH_TOKEN_SECRET,
    { expiresIn: "1d" }
  );

  return { accessToken, refreshToken };
};

export const verifyToken = (token, type = "access") => {
  try {
    const secret = type === "access" ? ACCESS_TOKEN_SECRET : REFRESH_TOKEN_SECRET;
    return verify(token, secret);
  } catch (err) {
    return null;
  }
};
