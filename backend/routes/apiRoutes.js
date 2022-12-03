const express = require("express")
const apiController = require("../controllers/apiController")

const router = express.Router()

router.post("/createCampaign", apiController.createCampaign)

router.get("/getAllCampaigns", apiController.getAllCampaigns)

router.get("/getCampaignById/:id", apiController.getCampaignById)

router.post("/donateToCampaign", apiController.donateToCampaign)

module.exports = router