// errorMiddleware.js
const handleErrors = (err, req, res, next) => {
  console.error("Error:", err);
  res.status(500).redirect("/error");
};

module.exports = handleErrors;
