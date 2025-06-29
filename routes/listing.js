const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const Listing = require("../models/listing.js");
const { isLogedIn, isOwner, validateListing } = require("../middlewares.js");

const listingController = require("../controllers/listings.js");

const multer = require("multer");
const {storage} = require("../cloudConfig.js");
const upload = multer({storage});

router.route("/")
.get(wrapAsync(listingController.index))
.post(isLogedIn, validateListing,upload.single("listing[image]"), wrapAsync(listingController.createListing));

//new route
router.get("/new", isLogedIn, listingController.renderNewForm);

router.route("/:id")
.get(wrapAsync(listingController.showListing))
.put(isLogedIn, isOwner, validateListing,upload.single("listing[image]"), wrapAsync(listingController.updateListing))
.delete(isLogedIn, isOwner, wrapAsync(listingController.destroyListing));

//edit route
router.get("/:id/edit", isLogedIn, isOwner, wrapAsync(listingController.renderEditForm));


module.exports = router;