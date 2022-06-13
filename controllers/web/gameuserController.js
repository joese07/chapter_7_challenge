const { Gameuser, Room } = require("../../models");

module.exports = {
  register: async (req, res, next) => {
    try {
      await Gameuser.register(req.body);
      res.redirect("/arena/login");
    } catch (err) {
      next(err);
    }
  },

  login: async (req, res, next) => {
    const user = await Gameuser.authenticate(req.body);
    const { name } = user;
    try {
      res.redirect("/arena/dashboard");
    } catch (err) {
      next(err);
    }

    // const user = await Gameuser.authenticate(req.body);
    // res.redirect("/arena/dashboard");
    // const { id, username } = user;
    // res.json({
    //   id,
    //   username,
    //   accessToken: user.generateToken(),
    // });
  },

  whoami: (req, res) => {
    Room.findAll({
      order: [["name_room", "ASC"]],
    }).then((room) => {
      res.render("pages/game/dashboard", { pageTitle: "Main Room", room });
    });
  },

  home: (req, res) => {
    const alertSuccess = req.flash("alertSuccess");

    Gameuser.findAll({
      order: [["name", "ASC"]],
    })
      .then((gameusers) => {
        res.render("pages/users/index", {
          pageTitle: "Daftar Biodata Table USer",
          gameusers,
          alertSuccess,
        });
      })
      .catch((err) => {
        res.status(422).json(" maaf, tidak bisa tampil data");
      });
  },

  show: (req, res) => {
    Gameuser.findOne({
      where: { id: req.params.id },
    })
      .then((gameuser) => {
        res.render("pages/users/detail", {
          pageTitle: `User ${gameuser.name}`,
          gameuser,
        });
      })
      .catch((err) => {
        res.status(422).json("maaf, tidak bisa tampil detail");
      });
  },

  showUpdate: (req, res) => {
    Gameuser.findOne({
      where: { id: req.params.id },
    }).then((gameuser) => {
      res
        .render("pages/users/edit", {
          pageTitle: `Edit Data User ${gameuser.name}`,
          gameuser,
        })
        .catch((err) => {
          res.status(422).json("Maaf, Load Data Error");
        });
    });
  },

  update: (req, res) => {
    let dateOfBirth;
    if (!req.body.tanggal_lahir) {
      dateOfBirth = null;
    } else {
      dateOfBirth = req.body.tanggal_lahir;
    }

    Gameuser.update(
      {
        name: req.body.name,
        placeOfBirth: req.body.tempat_lahir,
        dateOfBirth,
        address: req.body.alamat,
        email: req.body.email,
        phoneNumber: req.body.no_telepon,
      },
      {
        where: {
          id: req.params.id,
        },
      }
    )
      .then(() => {
        req.flash("alertSuccess", "Berhasil mengubah data game user");
        res.redirect("/gameusers");
      })
      .catch((err) => {
        res.status(422).json("Maaf, Data tidak dapat diupdate");
      });
  },

  destroy: (req, res) => {
    Gameuser.destroy({
      where: {
        id: req.params.id,
      },
    })
      .then(() => {
        req.flash("alertSuccess", " Data Berhasil dihapus");
        res.redirect("back");
      })
      .catch((err) => {
        res.status(422).json("Maaf, Data tidak dapat dihapus");
      });
  },
};
