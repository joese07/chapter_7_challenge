const express = require("express");
const gameuserController = require("../controllers/web/gameuserController");
const historiesuserController = require("../controllers/web/historiesuserController");
const gameroomController = require("../controllers/web/gameroomController");
const restrict = require("../middlewares/restrict");
const restrict_jwt = require("../middlewares/restrict_jwt");
const historiesGameController = require("../controllers/web/historiesGameController");

const router = express.Router();

//Session Usergame
router.get("/gameusers", restrict, gameuserController.home);

router.get("/gameusers/create", restrict, (req, res) =>
  res.render("pages/users/create", { pageTitle: "Create User" })
);
router.get("/gameusers/:id", restrict, gameuserController.show);
router.get("/gameusers/:id/edit", restrict, gameuserController.showUpdate);
router.put("/gameusers/:id", restrict, gameuserController.update);
router.delete("/gameusers/:id", restrict, gameuserController.destroy);

//Session Historyplayer
router.get("/histories", restrict, historiesuserController.home);
router.get("/histories/create", restrict, historiesuserController.create);
router.post("/histories", historiesuserController.store);

router.get("/histories/:id", restrict, historiesuserController.show);
router.get("/histories/:id/edit", restrict, historiesuserController.showUpdate);
router.put("/histories/:id", restrict, historiesuserController.update);
router.delete("/histories/:id", restrict, historiesuserController.destroy);

// session History game
router.get("/histori", historiesGameController.index);
//Session Arenagame
router.get("/arena/login", (req, res) => {
  res.render("pages/game/login", { pageTitle: "login player" });
});

router.get("/arena/dashboard", gameroomController.showRoom);
router.post("/gameuser", gameuserController.register);
router.get("/arena/create/user", (req, res) => {
  res.render("pages/game/signup", { pageTitle: " Create user" });
});
router.post("/arena/login", gameuserController.login);

//session roomgame
router.post("/dashboard", gameroomController.createRoom);
router.get("/arena/:id", gameroomController.arenaRoom);
router.post("/arena", gameroomController.playgame);
module.exports = router;
