var sqlite3 = require('sqlite3').verbose()
//var md5 = require('md5')

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