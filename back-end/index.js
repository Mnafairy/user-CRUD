// //module bichiglel
// import something from "somewhere";
// //commonJS -old
// const something = require("somewhere");
// // its the same thing different style of typing
const express = require("express");
const app = express();
const { products, users } = require("./dummy.json");
var bodyParser = require("body-parser");
app.use(bodyParser.json());
const fs = require("fs");
const cors = require("cors");
app.use(cors());

app.post("/add-user", (req, res) => {
  const newUser = req.body;
  console.log(newUser);
  // fs.writeFile("dummy.txt", JSON.stringify(newUser), function (err) {
  //   if (err) throw err;
  //   console.log("Saved!");
  // });
  // fs.rename("dummy.txt", "dummyRenamed.txt", function (err) {
  //   if (err) throw err;
  //   console.log("File Renamed!");
  // });
  // fs.unlink("dummyRenamed.txt", function (err) {
  //   if (err) throw err;
  //   console.log("File deleted!");
  // });
  fs.readFile("dummy.json", (error, data) => {
    if (error) {
      console.log("Error in reading file");
    } else {
      const jsonFile = JSON.parse(data.toString());
      jsonFile.users.push(newUser);
      fs.writeFile("dummy.json", JSON.stringify(jsonFile), (err) => {
        if (err) {
          console.log(err);
          res.send("error happened");
        } else {
          console.log("success");
          // res.send("User added successfully");
          res.send(JSON.stringify(jsonFile));
        }
      });
    }
  });
  // res.status(200);
  // res.send("succesful add request");
});

app.get("/read-new-user", (req, res) => {
  fs.readFile("dummy.txt", (error, data) => {
    if (error) {
      console.log("Error in reading file");
    } else {
      const jsonFile = JSON.parse(data.toString());
      jsonFile.users.push(newUser);

      res.status(200);
      res.send(data);
    }
  });
});
app.get("/products", (req, res) => {
  res.type = "application/json";
  res.send({ products });
});
app.get("/users", (req, res) => {
  res.type = "application/json";
  res.send({ users: users });
});
app.get("/usernames", (req, res) => {
  res.type = "application/json";
  const username = [
    ...products.map((e) => e.name),
    ...users.map((e) => e.name),
  ];
  res.send({ username });
  console.log(username);
});
app.listen(3001, () => {
  console.log("server is listening at port 3001");
});
