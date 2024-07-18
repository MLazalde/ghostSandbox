const router = require("express").Router();

const apiRoutes = require("./api");
const profileRoutes = require("./profile-routes");

//http://localhost:3001/
router.use("/", profileRoutes);
//http://localhost:3001/api
router.use("/api", apiRoutes);

module.exports = router;
