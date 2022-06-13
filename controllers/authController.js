const { Adminuser } = require("../models");
const passport = require("../lib/passport");

module.exports = {
  register: async (req, res) => {
    try {
      await Adminuser.register(req.body);
      res.redirect("/login");
    } catch (err) {
      next(err);
    }
  },

  login: passport.authenticate("local", {
    successRedirect: "/admin",
    failureRedirect: "/login",
    failureFlash: true,
  }),

  //   whoami: (req, res) => {
  //     res.render("/pages/home", req.user.dataValues);
  //   },
};
