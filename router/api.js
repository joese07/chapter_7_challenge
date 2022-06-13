const router = require("express").Router();
const gameuserController = require("../controllers/api/gameuserController");
const historiesuserController = require("../controllers/api/historiesuserController");

router.get("/gameusers", gameuserController.apihome);
router.post("/gameuser", gameuserController.apistore);
router.get("/gameuser/:id", gameuserController.apishow);
router.put("/gameuser/edit/:id", gameuserController.apishow);
router.delete("/gameuser/id:", gameuserController.apidestroy);

router.get("/histories", historiesuserController.apihome);
router.post("/histories", historiesuserController.apistore);
router.get("/histories/:id", historiesuserController.apishow);
router.put("/histories/edit/:id", historiesuserController.apiupdate);
router.delete("/histories/:id", historiesuserController.apidestroy);

module.exports = router;
