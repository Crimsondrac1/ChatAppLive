const router = require("express").Router();
const logs = require("./logs");
const users = require("./users");

//Setup endpoints
router.use("/categories", categoryRoutes);
router.use("/products", productRoutes);

module.exports = router;
