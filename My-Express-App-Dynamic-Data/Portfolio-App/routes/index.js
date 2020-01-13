var express = require("express");
var router = express.Router();

data = [
  {
    title: "Project One",
    description:
      " Using only javascript and css,many divs are created which change color on clicking them.No html is used here.",
    image: "/images/1.jpeg"
  },
  {
    title: "Project Two",
    description:
      " Using only javascript and css,many divs are created which change color on clicking them.No html is used here.",
    image: "/images/2.jpeg"
  },
  {
    title: "Project Three",
    description:
      " Using only javascript and css,many divs are created which change color on clicking them.No html is used here.",
    image: "/images/3.jpeg"
  },
  {
    title: "Project Four",
    description:
      " Using only javascript and css,many divs are created which change color on clicking them.No html is used here.",
    image: "/images/4.jpeg"
  },
  {
    title: "Project Five",
    description:
      " Using only javascript and css,many divs are created which change color on clicking them.No html is used here.",
    image: "/images/5.jpeg"
  }
];

/* GET home page. */
router.get("/", function(req, res, next) {
  res.render("home", { title: "Express" });
});

/* GET Projects Page. */
router.get("/projects", function(req, res, next) {
  res.render("index", { title: "Project Details", projects: data });
});
/* Get Project Details */
router.get("/projects/:id", function(req, res) {
  let id = parseInt(req.params.id);
  console.log("id --- > ", typeof id);
  if (id < data.length) {
    res.render("project-detail", { data: data[id] });
  } else {
    // 404
    console.log("page not found");
    res.send("Page not found");
  }
});

/* GET Blog Page. */
router.get("/blog", function(req, res, next) {
  res.render("index", { title: "Project Details", projects: data });
});

module.exports = router;
