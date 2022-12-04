require("dotenv").config()
const notificationController = require("../controllers/notificationController")
const Campaign = require("../models/campaign")




const createCampaign = async (req, res) => {

    try {
        // get zkaddress for campaign
        const response = await fetch(`https://cloud-mvp.zkbob.com/generateAddress?id=${process.env.ACCOUNT2_API_KEY}`);
        const data = await response.json();
        const campaignZkAddress = data.address

        const newCampaign = new Campaign({
            campaignCreatorEvmAddress: req.body.campaignCreatorEvmAddress,
            campaignZkAddress: campaignZkAddress,
            amountReq: req.body.amountReq,
            amountRaised: 0,
            campaignName: req.body.campaignName,
            campaignDesc: req.body.campaignDesc,
            campaignImage: "test"
        })
        await newCampaign.save()
        await notificationController.sendBroadcastNotificationCampaignCreated(req.body.campaignName, req.body.amountReq) 
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
            return
        }

        
        // send tx to zk address
        const response = await fetch('https://cloud-mvp.zkbob.com/transfer',{
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "accountId": process.env.ACCOUNT1_API_KEY,
                "amount": req.body.amountDonated * 10**9,
                "to": req.body.campaignZkAddress,
          })})

        if(response.status != 200){
            res.send("Error donating to campaign")
            return
        }
        else{
            console.log("Transaction submitted to relayer !")
        }


        const newAmountRaised = amountRaised + req.body.amountDonated
        await Campaign.updateOne({_id: req.body.campaignId}, {amountRaised: newAmountRaised})
        await notificationController.sendBroadcastNotificationCampaignDonated(campaign[0].campaignName, req.body.amountDonated)
        res.send(response)
        return
    }
    catch (err) {
        console.log(err)
        res.send("Error donating to campaign")
    }
}

const getBobBalance = async (req, res) => {
    const response = await fetch(`https://cloud-mvp.zkbob.com/account?id=${process.env.ACCOUNT1_API_KEY}`);
    const data = await response.json();
    var balance = {
        balance: data.balance / 10**9
    }
    res.send(balance)
}

module.exports = {createCampaign, getAllCampaigns, getCampaignById, donateToCampaign, getBobBalance}