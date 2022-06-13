const { Room, Gameuser, HistoriGame } = require("../../models");

const wait = {};
const data = {};

function waitEnemyResponse(id) {
  return new Promise((resolve) => {
    wait[id] = { resolve };
  });
}

module.exports = {
  createRoom: (req, res) => {
    Room.create({
      name_room: req.body.room_name,
    }).then(() => {
      res.redirect("/arena/dashboard");
    });
  },

  showRoom: async (req, res) => {
    const user = Gameuser.authenticate(req.username);
    const { name } = user;
    console.log(name);
    const room = await Room.findAll();
    try {
      res.render("pages/game/dashboard", { room, name });
    } catch (err) {
      next(err);
    }
  },

  arenaRoom: async (req, res) => {
    const roomid = await Room.findOne({ where: { id: req.params.id } });
    const { name_room } = roomid;
    try {
      res.render("pages/game/arena", { name_room });
    } catch (err) {
      next(err);
    }
  },

  playgame: async (req, res) => {
    const id = req.params.id;
    const playerSatu = req.body.choose;
    const playerDua = req.body.choose;
    let hasil = null;

    if (playerSatu === "BATU" && playerDua === "GUNTING") {
      hasil = "Player 1 Win";
    } else if (playerSatu === "GUNTING" && playerDua === "KERTAS") {
      hasil = "Player 1 Win";
    } else if (playerSatu === "KERTAS" && playerDua === "BATU") {
      hasil = "player 1 win";
    } else if (playerSatu === "GUNTING" && playerDua === "BATU") {
      hasil = "player 2 win";
    } else if (playerSatu === "KERTAS" && playerDua === "GUNTING") {
      hasil = "player 2 win";
    } else if (playerSatu === "BATU" && playerDua === "KERTAS") {
      hasil = "player 2 win";
    } else {
      hasil = "DRAW";
    }

    if (!data[id]) {
      data[id] = {
        player1: playerSatu,
        player2: null,
        result: hasil,
      };
    } else {
      data[id].player2 = playerDua;
    }

    if (!wait[id]) {
      await waitEnemyResponse(id);
    } else {
      wait[id].resolve();
      delete wait[id];
    }

    HistoriGame.create({
      player_one: playerSatu,
      player_two: playerDua,
      result: hasil,
    }).then((data) => {
      res.json(data);
    });

    res.json(data[id]);
    return hasil;
  },
};
