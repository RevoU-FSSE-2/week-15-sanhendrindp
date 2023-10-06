const express = require("express");
const router = express.Router();
const checkAuth = require("../middleware/check-auth");
const checkRole = require("../middleware/role-auth");
const multer = require("multer");
const cors = require("cors");
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});
const upload = multer({ storage: storage });
const {
  getAllProduct,
  createProduct,
  getProduct,
  updateProduct,
  deleteProduct,
} = require("../controllers/product-controller");

// Configure CORS independently
const ClientXoptions = {
  origin: "http://127.0.0.1:7000",
  methods: "GET",
};

// Route for get all products
router.get("/", cors(ClientXoptions), getAllProduct);

// Route for create a product
router.post(
  "/",
  checkAuth,
  checkRole(["admin", "user"]),
  upload.single("productImage"),
  createProduct
);

// Route for get a product by id
router.get("/:id", getProduct);

// Route for update a product
router.patch("/:id", checkAuth, checkRole(["admin", "user"]), updateProduct);

// Route for delete a product
router.delete("/:id", checkAuth, checkRole(["admin", "user"]), deleteProduct);

// Export
module.exports = router;
