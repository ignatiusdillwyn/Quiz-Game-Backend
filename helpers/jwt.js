const jwt = require("jsonwebtoken");
const secretCode = "bebas";

const tokenGenerator = (data) => {
  const { id, email, username, type } = data;
  const token = jwt.sign(
    {
      id,
      email,
      username,
      type: data.type
    },
    secretCode,
    // { expiresIn: '12h' }
  );

  return token;
};

const tokenVerifier = (data) => {
  const verifiedToken = jwt.verify(data, secretCode);

  return verifiedToken;
};

module.exports = {
  tokenGenerator,
  tokenVerifier,
};
