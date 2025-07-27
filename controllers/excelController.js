const joi = require("joi");
const Event = require("../models/event");

const excelSchema = joi.object({
  data: joi.array().required(),
});

/**
 * Create event (from Excel)
 */
exports.createEvent = async (req, res) => {
  try {
    const event = await Event.create({ ...req.body, userId: req.payload._id });
    res.json(event);
  } catch (err) {
    res.json(err);
  }
};

/**
 * Add people to event (single)
 */
exports.addPersonToEvent = async (req, res) => {
  try {
    const event = await Event.findOne({ _id: req.params.id });
    if (!event) return res.status(404).send("Event not found");
    await Event.findOneAndUpdate(
      { _id: req.params.id },
      { pepoleCome: [...event.pepoleCome, req.body] },
      { returnDocument: "after" },
      function (err, doc) {
        if (err) return res.json(err);
        res.json(200);
      }
    );
  } catch (err) {
    res.json(err);
  }
};

/**
 * Add people to event (bulk from Excel)
 */
exports.addPeopleFromExcel = async (req, res) => {
  const { error } = excelSchema.validate(req.body);
  if (error) return res.status(400).send("Invalid request body");
  const update = req.body.data;
  const newPeople = update.map((person) => ({
    phoneNumber: person["Phone Number"],
    firstName: person["First Name"],
    lastName: person["Last Name"],
    NumberOfGuests: person["Number Of Guests"],
    NumberOfGuestsAccept: person["Number Of Guests Accept"],
    eventGroupName: person["Event Group"],
  }));
  try {
    const event = await Event.findOne({ _id: req.params.id });
    if (!event) return res.status(404).send("Event not found");
    await Event.findOneAndUpdate(
      { _id: req.params.id },
      { pepoleCome: [...event.pepoleCome, ...newPeople] },
      { returnDocument: "after" },
      function (err, doc) {
        if (err) return res.json(err);
        res.json(200);
      }
    );
  } catch (err) {
    res.json(err);
  }
};
