const express = require("express");
const router = express.Router();
const joi = require("joi");
const auth = require("../middlewares/auth");
const Event = require("../models/event");
const excelController = require("../controllers/excelController");

// Create event (from Excel)
router.post("/", auth, excelController.createEvent);

// Add person to event (single)
router.patch("/addpepole/:id", excelController.addPersonToEvent);

// Add people to event (bulk from Excel)
router.post("/add/:id", excelController.addPeopleFromExcel);

const excelSchema = joi.object({
  data: joi.array().required(),
});
router.post("/add/:id", (req, res) => {
  console.log("H");
  const { error } = excelSchema.validate(req.body);
  if (error) {
    console.log(error);
    return res.status(400).send("Wrong body");
  }

  const update = req.body.data;
  let temp = [],
    newupdate = [];
  for (let index = 0; index < update.length; index++) {
    newupdate.push({
      phoneNumber: update[index]["Phone Number"],
      firstName: update[index]["First Name"],
      lastName: update[index]["Last Name"],
      NumberOfGuests: update[index]["Number Of Guests"],
      NumberOfGuestsAccept: update[index]["Number Of Guests Accept"],
      eventGroupName: update[index]["Event Group"],
    });
  }

  // console.log("temp");
  // console.log(temp);
  eventy = Event.findOne({ _id: req.params.id })
    .then((data) => {
      // for (let index = 0; index < data.pepoleCome.length; index++) {
      //     newupdate.push(data.pepoleCome[index]);
      //     // console.log(data.pepoleCome[index]);
      // }
      Event.findOneAndUpdate(
        { _id: req.params.id },
        { pepoleCome: [...data.pepoleCome, ...newupdate] },
        { returnDocument: "after" },
        function (err, doc) {
          res.json(200);
        }
      );
    })
    .catch((err) => res.json(err));
  console.log("update");
  // console.log(newupdate);
  // res.json(200); //IS OK
});

module.exports = router;
