const express = require("express");
const router = express.Router();
const checkAuth = require("../middleware/check-auth");
const checkRole = require("../middleware/role-auth");
const cors = require("cors");
const {
  getAllOrder,
  createOrder,
  getOrder,
  deleteOrder,
} = require("../controllers/order-controller");

// Configure CORS independently
const ClientYoptions = {
  origin: "http://127.0.0.1:8000",
  methods: "GET",
};

// Route for get all orders
router.get(
  "/",
  cors(ClientYoptions),
  checkAuth,
  checkRole(["admin", "user"]),
  getAllOrder
);

// Route for create an order
router.post("/", checkAuth, checkRole(["admin", "user"]), createOrder);

// Route for get an order by id
router.get("/:id", checkAuth, checkRole(["admin", "user"]), getOrder);

// Route for delete an order
router.delete("/:id", checkAuth, checkRole(["admin", "user"]), deleteOrder);

// Export
module.exports = router;
