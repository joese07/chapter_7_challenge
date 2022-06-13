const { Historiesuser, Gameuser } = require("../../models");

module.exports = {
  apihome: (req, res) => {
    Historiesuser.findAll({
      include: ["gameuser"],
    }).then((historiusers) => {
      res.status(200).json(historiusers);
    });
  },

  apishow: (req, res) => {
    Historiesuser.findOne({
      where: { id: req.params.id },
    }).then((historiuser) => {
      res.status(200).json(historiuser);
    });
  },

  apistore: (req, res) => {
    Historiesuser.create({
      idgameuser: req.body.id_user,
      nameOfGame: req.body.nama_game,
      level: req.body.level,
      joinDate,
    }).then((historiesuser) => {
      res.status(200).json(historiesuser);
    });
  },

  apiupdate: (req, res) => {
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
    ).then((historiesuser) => {
      res.status(200).json(historiesuser);
    });
  },

  apidestroy: (req, res) => {
    Historiesuser.destroy({
      where: {
        id: req.params.id,
      },
    }).then((historiesuser) => {
      res.status(200).json(historiesuser);
    });
  },
};
