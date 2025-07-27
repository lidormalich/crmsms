const joi = require("joi");
const Sentences = require("../models/sentence");

const sentenceSchema = joi.object({
  weddingSentence: joi.string().required().min(6),
});

/**
 * Get all sentences
 */
exports.getAllSentences = async (req, res) => {
  try {
    const sentences = await Sentences.find();
    res.status(200).send(sentences);
  } catch (err) {
    res.status(400).send(err);
  }
};

/**
 * Create a new sentence
 */
exports.createSentence = async (req, res) => {
  const { error } = sentenceSchema.validate(req.body);
  if (error) return res.status(400).send(error);
  try {
    await Sentences.create(req.body);
    return res.status(200).send("Sentence saved successfully");
  } catch (err) {
    return res.status(400).send("Couldn't save sentence");
  }
};
