require("dotenv").config()
const Campaign = require("../models/campaign")



const createCampaign = async (req, res) => {

    try {
        const newCampaign = new Campaign({
            campaignCreatorEvmAddress: req.body.campaignCreatorEvmAddress,
            campaignZkAddress: req.body.campaignZkAddress,
            amountReq: req.body.amountReq,
            amountRaised: 0,
            campaignName: req.body.campaignName,
            campaignDesc: req.body.campaignDesc,
            campaignImage: req.body.campaignImage
        })
        await newCampaign.save()
        res.send("Campaign Created")
    }
    catch (err) {
        console.log(err)
        res.send("Error creating campaign")
    }

}

const getAllCampaigns = async (req, res) => {
    try {
        const campaigns = await Campaign.find({})
        res.send(campaigns)
    }
    catch (err) {
        console.log(err)
        res.send("Error getting campaigns")
    }
}


const getCampaignById = async (req, res) => {
    try {
        const campaign = await Campaign.find({_id: req.params.id})
        res.send(campaign)
    }
    catch (err) {
        console.log(err)
        res.send("Error getting campaign")

    }
}


const donateToCampaign = async (req, res) => {
    try {
        // fetch campaign details of campaign from db where campaignZkAddress = req.body.campaignZkAddress
        // update amountRaised in db
        // send success response
        const campaign = await Campaign.find({_id: req.body.campaignId})
        const amountRaised = campaign[0].amountRaised
        if(amountRaised >= campaign[0].amountReq){
            res.send("Campaign is already funded")
        }
        const newAmountRaised = amountRaised + req.body.amountDonated
        await Campaign.updateOne({_id: req.body.campaignId}, {amountRaised: newAmountRaised})
        res.send("Donation Successful")
    }
    catch (err) {
        console.log(err)
        res.send("Error donating to campaign")
    }
}

module.exports = {createCampaign, getAllCampaigns, getCampaignById, donateToCampaign}