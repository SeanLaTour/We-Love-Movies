const router = require("express").Router();
const methodNotAllowed = require("../errors/methodNotAllowed");
const controller = require("./reviews.controller");
const cors = require("cors");

const corsDelete = cors({methods: "DELETE"});
const corsPut = cors({methods: "PUT"});

router.route("/:reviewId").put(corsPut, controller.update).delete(corsDelete, controller.destroy).options(corsDelete, corsPut).all(methodNotAllowed)

module.exports = router;