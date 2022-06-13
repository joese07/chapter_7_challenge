const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const { Strategy: JwtStrategy, ExtractJwt } = require("passport-jwt");

const { Adminuser, Gameuser } = require("../models");

/* Passport JWT Options */
const options = {
  // Untuk mengekstrak JWT dari request, dan mengambil token-nya dari header yang bernama Authorization
  jwtFromRequest: ExtractJwt.fromHeader("authorization"),

  /* Harus sama seperti dengan apa yang kita masukkan sebagai parameter kedua dari jwt.sign di User Model.
    Inilah yang kita pakai untuk memverifikasi apakah tokennya dibuat oleh sistem kita */
  secretOrKey: "ini rahasia ga boleh disebar",
};

async function authenticate(name, password, done) {
  try {
    const user = await Adminuser.authenticate({ name, password });

    return done(null, user);
  } catch (err) {
    return done(null, false, { message: err.message });
  }
}

passport.use(
  new JwtStrategy(options, async (payload, done) => {
    // payload adalah hasil terjemahan JWT, sesuai dengan apa yang kita masukkan di parameter pertama dari jwt.sign
    Gameuser.findByPk(payload.id)
      .then((user) => done(null, user))
      .catch((err) => done(err, false));
  })
);

passport.use(
  new LocalStrategy(
    { usernameField: "name", passwordField: "password" },
    authenticate
  )
);

passport.serializeUser((user, done) => done(null, user.id));

passport.deserializeUser(async (id, done) =>
  done(null, await Adminuser.findByPk(id))
);

module.exports = passport;
