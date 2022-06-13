const { Gameuser } = require("../../models");

module.exports = {
  apihome: (req, res) => {
    Gameuser.findAll
      .then((gameusers) => {
        res.status(200).json(gameusers);
      })
      .catch((err) => {
        res.status(422).json(" maaf, tidak bisa tampil data");
      });
  },

  apistore: (req, res) => {
    Gameuser.create({
      name: req.body.name,
      placeOfBirth: req.body.tempat_lahir,
      dateOfBirth,
      address: req.body.alamat,
      email: req.body.email,
      phoneNumber: req.body.no_telepon,
    })
      .then((gameuser) => {
        res.status(200).json(gameuser);
      })
      .catch((err) => {
        res.status(422).json(" can't create user");
      });
  },

  apishow: (req, res) => {
    Gameuser.findOne({
      where: { id: req.params.id },
    })
      .then((gameuser) => {
        res.status(200).jsonn(gameuser);
      })
      .catch((err) => {
        res.status(422).json("maaf, tidak bisa tampil detail");
      });
  },

  apiupdate: (req, res) => {
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
      .then((gameuser) => {
        res.status(200).json(gameuser);
      })
      .catch((err) => {
        res.status(422).json("Maaf, Data tidak dapat diupdate");
      });
  },

  apidestroy: (req, res) => {
    Gameuser.destroy({
      where: {
        id: req.params.id,
      },
    })
      .then((gameuser) => {
        res.status(200).json(gameuser);
      })
      .catch((err) => {
        res.status(422).json("Maaf, Data tidak dapat dihapus");
      });
  },
};
