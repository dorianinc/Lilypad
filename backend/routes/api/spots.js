const express = require("express");
const { check } = require("express-validator");
const { validateSpotPost } = require("../../utils/validation");
const { Spot, SpotImage } = require("../../db/models");

const router = express.Router();

router.get("/", async (req, res) => {
  const spots = await Spot.findAll();
  res.status(200).json(spots);
});

router.post("/", validateSpotPost, async (req, res) => {
  const { user } = req;
  const userId = user.dataValues.id;
  const { address, city, state, country, name, description, price } = req.body;
  if (user) return res.status(400).json(`Something went wrong!`);

  await Spot.create({
    address,
    city,
    state,
    city,
    country,
    name,
    description,
    price,
    ownerId: userId,
  });
  res.status(201);
  res.json(`Successfully created new spot for user ${userId}`);
});

router.post("/:spotId/images", async (req, res) => {
  const { user } = req;
  const userId = user.dataValues.id;
  const { url } = req.body;
  const spot = await Spot.findByPk(req.params.spotId, { raw: true });
  if (!spot) res.status(404).json("Spot does not exist");
  if (userId === spot.ownerId) {
    const newImage = await SpotImage.create({
      url,
      spotId: spot.id,
    });
    res.status(201);
    res.json(newImage);
  } else {
    res.json("something went wrong");
  }
});

module.exports = router;
