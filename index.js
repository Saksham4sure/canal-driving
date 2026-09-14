import express from "express";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

// View engine setup
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Static assets
app.use("/assets", express.static(path.join(__dirname, "assets")));
app.use(express.static(path.join(__dirname, "assets")));

// SEO files
app.get("/sitemap.xml", (req, res) => {
  res.type("application/xml");
  res.sendFile(path.join(__dirname, "sitemap.xml"));
});

app.get("/robots.txt", (req, res) => {
  res.type("text/plain");
  res.sendFile(path.join(__dirname, "robots.txt"));
});

// Page routes
app.get("/", (req, res) => {
  res.render("index");
});

app.get("/services", (req, res) => {
  res.render("services");
});

app.get("/full-teen-program", (req, res) => {
  res.render("full-teen-program");
});

app.get("/teen-online-class", (req, res) => {
  res.render("teen-online-class");
});

app.get("/teen-in-person-education", (req, res) => {
  res.render("teen-in-person-education");
});

app.get("/adult-driving-programs", (req, res) => {
  res.render("adult-driving-programs");
});

app.get("/behind-the-wheel-only", (req, res) => {
  res.render("behind-the-wheel-only");
});

app.get("/maneuverability-test-prep", (req, res) => {
  res.render("maneuverability-test-prep");
});

// 301 Redirects for legacy .html URLs to clean Express routes
const legacyRedirects = {
  "/index.html": "/",
  "/services.html": "/services",
  "/full-teen-program.html": "/full-teen-program",
  "/teen-online-class.html": "/teen-online-class",
  "/teen-in-person-education.html": "/teen-in-person-education",
  "/adult-driving-programs.html": "/adult-driving-programs",
  "/behind-the-wheel-only.html": "/behind-the-wheel-only",
  "/maneuverability-test-prep.html": "/maneuverability-test-prep",
};

for (const [oldPath, newPath] of Object.entries(legacyRedirects)) {
  app.get(oldPath, (req, res) => {
    res.redirect(301, newPath);
  });
}

// 404 fallback
app.use((req, res) => {
  res.status(404).redirect("/");
});

// app.listen(PORT, () => {
//   console.log(`Server listening on http://localhost:${PORT}`);
// });


export default app;