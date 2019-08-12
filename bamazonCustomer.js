var mysql = require("mysql");






var connection = mysql.createConnection({
  host: "localhost",

  // Your port; if not 3306
  port: 3306,

  // Your username
  user: "root",

  // Your password
  password: "password",
  database: "bamazon"
});

connection.connect(function(err) {
  if (err) throw err;
  console.log("connected as id " + connection.threadId + "\n");
  afterConnection();
});

function afterConnection() {
    connection.query("SELECT * FROM products;", function(err, res) {
      if (err) throw err;
      console.table(res);
      connection.end();
    });
  }



//   function whichArtist() {
//     artist = process.argv.slice(2).join("")
//     console.log(artist)
 
//     connection.query("SELECT song FROM top_playlist.songs WHERE artist = ?;",[artist],function(err, res) {
//         console.log("-------------------------------------------------------")
//       if (err) throw err;
//       console.log(res);
//       connection.end();
//     });
//   }

//   function whichSong() {
//     song = process.argv.slice(2).join("")
//     console.log(song)
 
//     connection.query("SELECT * FROM top_playlist.songs WHERE song = ?;",[song],function(err, res) {
//         console.log("-------------------------------------------------------")
//       if (err) throw err;
//       console.log(res);
//       connection.end();
//     });
//   }


