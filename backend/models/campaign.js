const mongoose = require("mongoose")

const Schema = mongoose.Schema;

const campaignSchema = new Schema({
    campaignCreatorEvmAddress: {
        type: String,
        required: true,
    },
    campaignZkAddress: {
        type: String,
        required: true,
    },
    amountReq: {
        type: Number,
        required: true,
    },
    amountRaised: {
        type: Number,
        required: true,
    },
    campaignName: {
        type: String,
        required: true,
    },
    campaignDesc: {
        type: String,
        required: true
    },
    campaignImage: {
        type: String,
        required: true
    }

})

const Campaign = mongoose.model("campaign", campaignSchema);

module.exports = Campaign;