const path = require("path");
const express = require("express");
const expressNunjucks = require("express-nunjucks");

const app = express();

const sampleUser = {
  firstName: "Alfred",
  age: 33,
  pet: {
    name: "Poncho",
  },
};
const hackedSampleUser = {
  firstName: "Alfred",
  age: "'';alert('BOOM! Bad things can happen without a CSP...');",
  pet: null,
};
const CSP_HEADER = {
  "Content-Security-Policy":
    "default-src 'self'; form-action 'self'; style-src 'self' fonts.googleapis.com; font-src 'self' fonts.gstatic.com;",
};

app.set("views", path.join(__dirname, "views"));
expressNunjucks(app, {
  watch: true,
  noCache: true,
  // this is obviously bad, but needed to illustrate the point.
  autoescape: false,
});

app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
  res.render("index");
});

app.get("/unsafe-script-hacked", (req, res) => {
  // Note that we don't set a CSP here
  res.render("unsafe", { user: hackedSampleUser });
});
app.get("/unsafe-script-blocked", (req, res) => {
  res.set(CSP_HEADER);
  res.render("unsafe", { user: sampleUser });
});
app.get("/safe-example", (req, res) => {
  res.set(CSP_HEADER);
  res.render("safe", { user: sampleUser });
});
app.get("/safe-parse-error", (req, res) => {
  res.set(CSP_HEADER);
  res.render("safe", { user: hackedSampleUser });
});

app.listen(3000, () =>
  console.log("Example app listening at http://localhost:3000")
);
