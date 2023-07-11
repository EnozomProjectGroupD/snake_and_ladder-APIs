const verifySignUp = (req, res, next) => {
  const passwordRegex = new RegExp(
    "^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{6,})"
  );
  const password = req.body.password;
  const confirmPassword = req.body.confirmPassword;

  if (passwordRegex.test(password)) {
    if (password === confirmPassword) {
      next();
    } else {
      res.status(500).json({
        message: "Password and confirm password does not match!",
      });
    }
  } else {
    res.status(500).json({
      message:
        "Password must be at least 8 characters long, conatins at least one uppercase letter, one lowercase letter, one number and one special character",
    });
  }
};

export default verifySignUp;
