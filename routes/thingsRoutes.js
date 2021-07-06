const express = require("express");
const passport = require("passport");

const router = express.Router();

const {
  fetchThing,
  fetchTreasure,
  fetchGarbage,
  createThings,
} = require("../controllers/thingController");

router.param("thingId", async (req, res, next, thingId) => {
  const foundThing = await fetchThing(thingId, next);
  if (foundThing) {
    req.thing = foundThing;
    next();
  } else {
    const err = new Error("Product Not Found");
    err.status = 404;
    next(err);
  }
});
router.get(
  "/treasures",
  passport.authenticate("jwt", { session: false }),
  fetchTreasure
);
router.get("/garbages", fetchGarbage);
router.post("/things", createThings);

module.exports = router;
