const Event = require("../models/event");
const SMS = require("../models/smsmodel");

/**
 * Create a new event and initialize its SMS record
 */
exports.createEvent = async (req, res) => {
  try {
    const newEvent = await Event.create({
      ...req.body,
      userId: req.payload._id,
    });
    await SMS.create({ eventId: newEvent._id });
    res.status(200).json(newEvent);
  } catch (error) {
    res.status(400).json({ message: "Failed to create event", error });
  }
};

/**
 * Add people to an event
 */
exports.addPeopleToEvent = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) return res.status(404).json({ message: "Event not found" });
    event.pepoleCome.push(req.body);
    await event.save();
    res.status(200).json(event.pepoleCome);
  } catch (error) {
    res.status(400).json({ message: "Failed to add people", error });
  }
};

/**
 * Get all people in an event
 */
exports.getPeopleInEvent = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) return res.status(404).json({ message: "Event not found" });
    event.pepoleCome.forEach((person) => {
      if (person.NumberOfGuestsAccept == null) {
        person.NumberOfGuestsAccept = 0;
      }
    });
    res.status(200).json(event.pepoleCome);
  } catch (error) {
    res.status(400).json({ message: "Failed to get people", error });
  }
};

/**
 * Delete a person from an event
 */
exports.deletePersonFromEvent = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) return res.status(404).json({ message: "Event not found" });
    const index = event.pepoleCome.findIndex(
      (person) => person.phoneNumber === req.body.phoneNum
    );
    if (index === -1)
      return res.status(404).json({ message: "Person not found" });
    event.pepoleCome.splice(index, 1);
    await event.save();
    res.status(200).json(event.pepoleCome);
  } catch (error) {
    res.status(400).json({ message: "Failed to delete person", error });
  }
};

/**
 * Get a specific person from an event
 */
exports.getPersonFromEvent = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) return res.status(404).json({ message: "Event not found" });
    const person = event.pepoleCome.find(
      (p) => p.phoneNumber === req.params.phone
    );
    if (!person) return res.status(404).json({ message: "Person not found" });
    res.status(200).json(person);
  } catch (error) {
    res.status(400).json({ message: "Failed to get person", error });
  }
};

/**
 * Update a person in an event
 */
exports.updatePersonInEvent = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) return res.status(404).json({ message: "Event not found" });
    const index = event.pepoleCome.findIndex(
      (person) => person.phoneNumber === req.body.phoneNumber
    );
    if (index === -1)
      return res.status(404).json({ message: "Person not found" });
    event.pepoleCome[index] = req.body;
    await event.save();
    res.status(200).json(event.pepoleCome);
  } catch (error) {
    res.status(400).json({ message: "Failed to update person", error });
  }
};

/**
 * Update couple image for an event
 */
exports.updateCoupleImage = async (req, res) => {
  try {
    const event = await Event.findByIdAndUpdate(
      req.params.id,
      { coupleImage: req.body.data.coupleImage },
      { new: true }
    );
    if (!event) return res.status(404).json({ message: "Event not found" });
    res.status(200).json(event);
  } catch (error) {
    res.status(400).json({ message: "Failed to update couple image", error });
  }
};

/**
 * Get wedding date for an event
 */
exports.getWeddingDate = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id, "weddingDate");
    if (!event) return res.status(404).json({ message: "Event not found" });
    res.status(200).json(event);
  } catch (error) {
    res.status(400).json({ message: "Failed to get wedding date", error });
  }
};

/**
 * Get couple image for an event
 */
exports.getCoupleImage = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id, "_id coupleImage");
    if (!event) return res.status(404).json({ message: "Event not found" });
    res.status(200).json(event);
  } catch (error) {
    res.status(400).json({ message: "Failed to get couple image", error });
  }
};

/**
 * Get all events for a user
 */
exports.getAllEventsForUser = async (req, res) => {
  try {
    const events = await Event.find(
      { userId: req.payload._id },
      "_id uuid campaignName ownerName phone bride groom brideParents groomParents coupleImage"
    );
    res.status(200).json(events);
  } catch (error) {
    res.status(400).json({ message: "Failed to get events", error });
  }
};

/**
 * Delete an event
 */
exports.deleteEvent = async (req, res) => {
  try {
    const event = await Event.findByIdAndDelete(req.params.id);
    if (!event) return res.status(404).json({ message: "Event not found" });
    res.status(200).json({ message: "Event deleted" });
  } catch (error) {
    res.status(400).json({ message: "Failed to delete event", error });
  }
};
