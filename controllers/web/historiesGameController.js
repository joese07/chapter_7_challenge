const { HistoriGame } = require("../../models");

module.exports = {
  index: async (req, res) => {
    const showAll = await HistoriGame.findAll();
    try {
      res.render("pages/history/game", { showAll });
    } catch (err) {
      next(err);
    }
  },
};
