const express = require('express');
const router = express.Router();
const joi = require('joi');
const auth = require('../middlewares/auth');
const Event = require('../models/event');
const SMS = require('../models/smsmodel');

// Create event
router.post('/', auth, async (req, res) => {
    try {
        const event = await Event.create({ ...req.body, userId: req.payload._id });
        await SMS.create({ eventId: event._id });
        res.status(200).send(event);
    } catch (error) {
        res.status(400).send(error);
    }
});

// Add people to event
router.patch('/addpepole/:id', async (req, res) => {
    try {
        const event = await Event.findById(req.params.id);
        if (!event) return res.status(404).send("Event not found");

        event.pepoleCome.push(req.body);
        await event.save();
        res.status(200).json(event.pepoleCome);
    } catch (err) {
        res.status(400).json(err);
    }
});

// Get all people in event
router.get('/getPeople/:id', async (req, res) => {
    try {
        const event = await Event.findById(req.params.id);
        if (!event) return res.status(404).send("Event not found");

        event.pepoleCome.forEach(person => {
            if (person.NumberOfGuestsAccept == null) {
                person.NumberOfGuestsAccept = 0;
            }
        });

        res.status(200).json(event.pepoleCome);
    } catch (err) {
        res.status(400).json(err);
    }
});

// Delete person from event
router.patch('/deletepepole/:id', async (req, res) => {
    try {
        const event = await Event.findById(req.params.id);
        if (!event) return res.status(404).send("Event not found");

        const index = event.pepoleCome.findIndex(person => person.phoneNumber === req.body.phoneNum);
        if (index === -1) return res.status(404).send("Person not found");

        event.pepoleCome.splice(index, 1);
        await event.save();
        res.status(200).json(event.pepoleCome);
    } catch (err) {
        res.status(400).json(err);
    }
});

// Get specific person
router.get('/getoneepepole/:id/:phone', async (req, res) => {
    try {
        const event = await Event.findById(req.params.id);
        if (!event) return res.status(404).send("Event not found");

        const person = event.pepoleCome.find(p => p.phoneNumber === req.params.phone);
        if (!person) return res.status(404).send("Person not found");

        res.status(200).json(person);
    } catch (err) {
        res.status(400).json(err);
    }
});

// Update person in event
router.patch('/updatepepole/:id', async (req, res) => {
    try {
        const event = await Event.findById(req.params.id);
        if (!event) return res.status(404).send("Event not found");

        const index = event.pepoleCome.findIndex(person => person.phoneNumber === req.body.phoneNumber);
        if (index === -1) return res.status(404).send("Person not found");

        event.pepoleCome[index] = req.body;
        await event.save();
        res.status(200).json(event.pepoleCome);
    } catch (err) {
        res.status(400).json(err);
    }
});

// Update couple image
router.patch('/img/:id', async (req, res) => {
    try {
        const event = await Event.findByIdAndUpdate(
            req.params.id,
            { coupleImage: req.body.data.coupleImage },
            { new: true }
        );
        if (!event) return res.status(404).send("Event not found");

        res.status(200).json(event);
    } catch (err) {
        res.status(400).json(err);
    }
});

// Get wedding date
router.get('/date/:id', async (req, res) => {
    try {
        const event = await Event.findById(req.params.id, "weddingDate");
        if (!event) return res.status(404).send("Event not found");

        res.status(200).json(event);
    } catch (err) {
        res.status(400).json(err);
    }
});

// Get couple image
router.get('/img/:id', async (req, res) => {
    try {
        const event = await Event.findById(req.params.id, "_id coupleImage");
        if (!event) return res.status(404).send("Event not found");

        res.status(200).json(event);
    } catch (err) {
        res.status(400).json(err);
    }
});

// Get all events for user
router.get('/allEvent', auth, async (req, res) => {
    try {
        const events = await Event.find(
            { userId: req.payload._id },
            "_id uuid campaignName ownerName phone bride groom brideParents groomParents coupleImage"
        );
        res.status(200).json(events);
    } catch (err) {
        res.status(400).json(err);
    }
});

// Delete event
router.delete('/deleteEvent/:id', async (req, res) => {
    try {
        const event = await Event.findByIdAndDelete(req.params.id);
        if (!event) return res.status(404).send("Event not found");

        res.status(200).send("Event deleted");
    } catch (err) {
        res.status(400).json(err);
    }
});

module.exports = router;