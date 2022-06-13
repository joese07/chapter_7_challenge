const router = require("express").Router();
const webRouter = require("./web");
const apiRouter = require("./api");
const authController = require("../controllers/authController");
const restrict = require("../middlewares/restrict");

router.get("/admin", restrict, (req, res) => res.render("pages/home"));

router.use("/", webRouter);
router.use("/api", restrict, apiRouter);
router.get("/register", (req, res) => res.render("login/signup"));
router.post("/register", authController.register);
router.get("/login", (req, res) => {
  const alertSuccess = req.flash("alertSuccess");
  try {
    res.render("login/login", { alertSuccess });
  } catch (err) {
    res.status(422).json("error");
  }
});
router.post("/login", authController.login);

module.exports = router;
