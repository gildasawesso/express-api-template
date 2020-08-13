export var jwtConfig = {
  algorithm: "HS256",
  accessTokenExpiryTime: 60 * 60, // 1h
  refreshTokenExpiryTime: 60 * 60, // 1h
  secret: process.env.JWT_SECRET,
}