
const verifyPassword = (req, res, next) => {
  const password = req.body.password;
  const passwordRegex = new RegExp(
    "^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{6,})"
  );
  console.log(passwordRegex.test(password));
  if (passwordRegex.test(password)) {
    next();
  } else {
    res.status(500).json({
      message:
        "Password must be at least 8 characters long, conatins at least one uppercase letter, one lowercase letter, one number and one special character",
    });
  }

};

export default verifyPassword;
