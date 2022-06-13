const { Historiesuser, Gameuser } = require("../../models");

module.exports = {
  home: (req, res) => {
    const alertSuccess = req.flash("alertSuccess");

    Historiesuser.findAll({
      include: ["gameuser"],
    }).then((historiusers) => {
      res.render("pages/history/index", {
        pageTitle: "Daftar table History",
        historiusers,
        alertSuccess,
      });
    });
  },

  create: (req, res) => {
    Gameuser.findAll().then((gamesuser) => {
      res.render("pages/history/create", {
        pageTitle: "Buat Histori Games",
        gamesuser,
      });
    });
  },

  show: (req, res) => {
    Historiesuser.findOne({
      where: { id: req.params.id },
    }).then((historiuser) => {
      res.render("pages/history/detail", {
        pageTitle: `History Game`,
        historiuser,
      });
    });
  },

  store: (req, res) => {
    let joinDate;
    if (!req.body.joinDate) {
      joinDate = null;
    } else {
      joinDate = req.body.joinDate;
    }
    Historiesuser.create({
      idgameuser: req.body.id_user,
      nameOfGame: req.body.nama_game,
      level: req.body.level,
      joinDate,
    }).then(() => {
      req.flash("alertSuccess", "Berhasil membuat Histori game user");
      res.redirect("/histories");
    });
  },

  showUpdate: (req, res) => {
    Historiesuser.findOne({
      where: { id: req.params.id },
    }).then((historiuser) => {
      res.render("pages/history/edit", {
        pageTitle: "Edit Data histori",
        historiuser,
      });
    });
  },

  update: (req, res) => {
    let joinDate;
    if (!req.body.joinDate) {
      joinDate = null;
    } else {
      joinDate = req.body.joinDate;
    }
    Historiesuser.update(
      {
        idgameuser: req.body.id_user,
        nameOfGame: req.body.nama_game,
        level: req.body.level,
        joinDate,
      },
      {
        where: {
          id: req.params.id,
        },
      }
    ).then(() => {
      req.flash("alertSuccess", "Berhasil mengubah data ");
      res.redirect("/histories");
    });
  },

  destroy: (req, res) => {
    Historiesuser.destroy({
      where: {
        id: req.params.id,
      },
    }).then(() => {
      req.flash("alertSuccess", "berhasil hapus data");
      res.redirect("back");
    });
  },
};
