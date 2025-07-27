const express = require("express");
const router = express.Router();
const auth = require("../middlewares/auth");
const eventController = require("../controllers/eventController");

// Create event
router.post("/", auth, eventController.createEvent);

// Add people to event
router.patch("/addpepole/:id", eventController.addPeopleToEvent);

// Get all people in event
router.get("/getPeople/:id", eventController.getPeopleInEvent);

// Delete person from event
router.patch("/deletepepole/:id", eventController.deletePersonFromEvent);

// Get specific person
router.get("/getoneepepole/:id/:phone", eventController.getPersonFromEvent);

// Update person in event
router.patch("/updatepepole/:id", eventController.updatePersonInEvent);

// Update couple image
router.patch("/img/:id", eventController.updateCoupleImage);

// Get wedding date
router.get("/date/:id", eventController.getWeddingDate);

// Get couple image
router.get("/img/:id", eventController.getCoupleImage);

// Get all events for user
router.get("/allEvent", auth, eventController.getAllEventsForUser);

// Delete event
router.delete("/deleteEvent/:id", eventController.deleteEvent);

module.exports = router;
