const express = require("express");
const app = express();
const { users } = require("./dummy.json");
var bodyParser = require("body-parser");
app.use(bodyParser.json());
const fs = require("fs");
const cors = require("cors");
app.use(cors());
console.log("users:", users);

// const writefile = (e) => {
//   const jsonFile = JSON.parse(data.toString());
//   jsonFile.users.push(e);
//   return fs.writeFile("dummy.json", JSON.stringify(jsonFile), (err) => {
//     if (err) {
//       console.log(err);
//       res.send("error happened");
//     } else {
//       console.log("success");
//       res.send(JSON.stringify(e));
//     }
//   });
// };
app.post("/add-user", (req, res) => {
  const newUser = req.body;
  console.log("newUser:", newUser);
  fs.readFile("dummy.json", (error, data) => {
    if (error) {
      console.log("Error in reading file");
    } else {
      try {
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
      } catch (error) {
        console.log("in Catch:", error);
        res.status(400);
        res.send(`error happened: ${error.message}`);
      }
    }
  });
});

// app.get("/read-new-user", (req, res) => {
//   fs.readFile("dummy.txt", (error, data) => {
//     if (error) {
//       console.log("Error in reading file");
//     } else {
//       const jsonFile = JSON.parse(data.toString());
//       jsonFile.users.push(newUser);
//       res.status(200);
//       res.send(data);
//     }
//   });
// });
app.post("/delete-user", (req, res) => {
  const idToDelete = req.body.id;
  const newUsers = users.filter((e) => e.id != idToDelete);
  fs.writeFile("dummy.json", JSON.stringify({ users: newUsers }), (err) => {
    if (err) {
      console.log(err);
      res.send("error happened");
    } else {
      console.log("success");
      res.send(JSON.stringify(newUsers));
    }
  });
});

app.post("/update-user", (req, res) => {
  const { id, updateData } = req.body;
});

app.get("/users", (req, res) => {
  res.type = "application/json";
  res.send({ users: users });
});
// app.get("/usernames", (req, res) => {
//   res.type = "application/json";
//   const username = [
//     ...products.map((e) => e.name),
//     ...users.map((e) => e.name),
//   ];
//   res.send({ username });
//   console.log(username);
// });
app.listen(3001, () => {
  console.log("server is listening at port 3001");
});

// const userx = {
//   name: "Orgil",
//   age: 25,
//   email: "mnafairy@gmail.com",
// };
// const updateData = { name: "Khuslen", age: 18 };
// const updatedData = { ...userx, ...updateData };
// console.log(updatedData);
