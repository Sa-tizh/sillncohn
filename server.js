// Create express app
var express = require("express")
var app = express()
var md5 = require("md5")

var bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

var sqlite3 = require('sqlite3').verbose()
const DBSOURCE = "db.sqlite"

let db = new sqlite3.Database(DBSOURCE, (err) => {
    if (err) {
      // Cannot open database
      console.error(err.message)
      throw err
    }else{
        console.log('Connected to the SQLite database.')
        db.run(`CREATE TABLE user (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            brand text, 
            model text UNIQUE,
	    os text, 
            screensize int,
	    image text UNIQUE, 
            CONSTRAINT phone_unique UNIQUE (model, image)
            )`,
        (err) => {
            if (err) {
                // Table already created
            }else{
                // Table just created, creating some rows
                var insert = 'INSERT INTO user (brand, model, os, screensize, image) VALUES (?,?,?,?,?)'
                db.run(insert, ["Apple", "iPhone X", "iOS", 8, "https://consumentenbond-res.cloudinary.com/w_1400,f_auto/e_improve:30/v0/productvergelijker/MOBTEL/900611_kk_10"])
                db.run(insert, ["Samsung", "Galaxy S9", "Android", 11, "https://image.samsung.com/us/smartphones/galaxy-s9/phones/S9/Blue/0914-GI-GS9-PDP-Back-Blue.jpg"])
            }
        });  
    }
});

module.exports = db

// Server port
var HTTP_PORT = 3000 
// Start server
app.listen(HTTP_PORT, () => {
    console.log("Server running on port %PORT%".replace("%PORT%",HTTP_PORT))
});
// Root endpoint
app.get("/", (req, res, next) => {
    res.json({"message":"Ok"})
});

// Insert here other API endpoints
app.get("/api/products", (req, res, next) => {
    var sql = "select * from user"
    var params = []
    db.all(sql, params, (err, rows) => {
        if (err) {
          res.status(400).json({"error":err.message});
          return;
        }
        res.json({
            "message":"success",
            "data":rows
        })
      });
});

app.get("/api/product/:id", (req, res, next) => {
    var sql = "select * from user where id = ?"
    var params = [req.params.id]
    db.get(sql, params, (err, row) => {
        if (err) {
          res.status(400).json({"error":err.message});
          return;
        }
        res.json({
            "message":"success",
            "data":row
        })
      });
});

app.post("/api/product/", (req, res, next) => {
    var errors=[]
    if (!req.body.brand){
        errors.push("No brand specified.");
    }
    if (!req.body.model){
        errors.push("No model specified.");
    }
    if (!req.body.os){
        errors.push("No os specified.");
    }
    if (!req.body.screensize){
        errors.push("No screensize specified.");
    }
    if (!req.body.image){
        errors.push("No image specified.");
    }

    if (isNaN(req.body.screensize)){
        errors.push("Screensize is not a number.");
    }
  
    if (errors.length){
        res.status(400).json({"error":errors.join(" ")});
        return;
    }
    var data = {
        brand: req.body.brand,
        model: req.body.model,
        os: req.body.os,
        screensize: req.body.screensize,
        image: req.body.image        
    }
    var sql ='INSERT INTO user (brand, model, os, screensize, image) VALUES (?,?,?,?,?)'
    var params =[data.brand, data.model, data.os, data.screensize, data.image]
    db.run(sql, params, function (err, result) {
        if (err){
            res.status(400).json({"error": err.message})
            return;
        }
        res.json({
            "message": "success",
            "data": data,
            "id" : this.lastID
        })
    });
})

app.put("/api/product/:id", (req, res, next) => {
    var errors=[]
    if (!req.body.brand){
        errors.push("No brand specified.");
    }
    if (!req.body.model){
        errors.push("No model specified.");
    }
    if (!req.body.os){
        errors.push("No os specified.");
    }
    if (!req.body.screensize){
        errors.push("No screensize specified.");
    }
    if (!req.body.image){
        errors.push("No image specified.");
    }
    
    if (isNaN(req.body.screensize)){
        errors.push("Screensize is not a number.");
    }

    if (errors.length){
        res.status(400).json({"error":errors.join(",")});
        return;
    }


    var data = {
        brand: req.body.brand,
        model: req.body.model,
        os: req.body.os,
        screensize: req.body.screensize,
        image: req.body.image
    }
    db.run(
        `UPDATE user set 
           brand = COALESCE(?,brand), 
           model = COALESCE(?,model),
           os = COALESCE(?,os), 
           screensize = COALESCE(?,screensize), 
           image = COALESCE(?,image)    
           WHERE id = ?`,
        [data.brand, data.model, data.os, data.screensize, data.image, req.params.id],
        function (err, result) {
            if (err){
                res.status(400).json({"error": err.message})
                return;
            }
            res.json({
                message: "success",
                data: data,
                changes: this.changes
            })
    });
})

app.delete("/api/product/:id", (req, res, next) => {
    db.run(
        'DELETE FROM user WHERE id = ?',
        req.params.id,
        function (err, result) {
            if (err){
                res.status(400).json({"error": res.message})
                return;
            }
            res.json({"message":"deleted", changes: this.changes})
    });
})

// Default response for any other request
app.use(function(req, res){
    res.status(404);
});
