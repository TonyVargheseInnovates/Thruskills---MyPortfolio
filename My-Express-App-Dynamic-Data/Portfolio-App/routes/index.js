var express = require("express");
var router = express.Router();
var MongoClient = require("mongodb").MongoClient;
var ObjectId = require("mongodb").ObjectID;

var url = "mongodb://localhost:27017/";

/* GET home page. */
router.get("/", function(req, res, next) {
  // Retreiving details for Recent Posts from Mongo DB
  MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    var dbo = db.db("portfolio");
    dbo
      .collection("projects")
      .find({})
      .limit(3)
      .toArray(function(err, projects) {
        if (err) throw err;
        console.log("Projects = " + JSON.stringify(projects));
        dbo
          .collection("blog")
          .find({})
          .limit(3)
          .toArray(function(err, blog) {
            if (err) throw err;
            console.log("Blog = " + JSON.stringify(blog));
            db.close();
            res.render("home", { blog: blog, projects: projects });
          });
      });
  });
});

/* GET Projects Page. */
router.get("/projects", function(req, res, next) {
  MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    var dbo = db.db("portfolio");
    dbo
      .collection("projects")
      .find({})
      .toArray(function(err, projects) {
        if (err) throw err;
        console.log("Projects = " + JSON.stringify(projects));
        db.close();
        res.render("index", { title: "Project Details", projects: projects });
      });
  });
});
/* Get Project Details */
router.get("/projects/:id", function(req, res) {
  let id = parseInt(req.params.id);
  res.render("project-detail", { data: data[id] });
  console.log("id --- > ", id);
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
  // Get data from MongoDB
  MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    var dbo = db.db("portfolio");
    dbo
      .collection("blog")
      .find({})
      .toArray(function(err, blog) {
        if (err) throw err;
        console.log("Blog = " + JSON.stringify(blog));
        db.close();
        res.render("blog", {
          title: "Blog",
          layout: "layout2",
          blog: blog
        });
      });
  });
});

/* GET Contact Page. */
router.get("/contact", function(req, res, next) {
  res.render("contact", {
    title: "Contact Us",
    layout: "layout2"
  });
});

router.post("/contact", function(req, res) {
  //console.table(req.body);
  let name = req.body.name;
  let mobile = req.body.mobile;
  let email = req.body.email;
  let description = req.body.description;

  MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    var dbo = db.db("portfolio");
    let contact = {
      name,
      mobile,
      email,
      message: description,
      date_created: new Date(),
      date_modified: new Date()
    };
    dbo.collection("contact").insertOne(contact, function(err, contactObj) {
      if (err) throw err;
      console.log("1 document inserted. Name:" + contactObj.name);
      db.close();
      res.render("contact", { success: true });
    });
  });
});

/* GET About Page. */
router.get("/about", function(req, res, next) {
  res.render("about", {
    layout: "layout2"
  });
});

module.exports = router;
