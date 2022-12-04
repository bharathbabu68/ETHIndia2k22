const PushAPI = require("@pushprotocol/restapi");
const ethers = require("ethers")
require("dotenv").config()


const PK = process.env.EPNS_CHANNEL_PK// channel private key
const Pkey = `0x${PK}`
const signer = new ethers.Wallet(Pkey);

const sendBroadcastNotificationCampaignCreated = async (campaignName, amountReq) => {
    try {

        const apiResponse = await PushAPI.payloads.sendNotification({
            signer,
            type: 1, // broadcast
            identityType: 2, // direct payload
            notification: {
              title: `New Campaign Created`,
              body: `Campaign Name: ${campaignName} Amount Required: ${amountReq} BOB`,
            },
            payload: {
              title: `New Campaign Created`,
              body: `Campaign Name: ${campaignName} Amount Required: ${amountReq} BOB`,
              cta: '',
              img: ''
            },
            channel: 'eip155:80001:0x0A04d6c616A334d7d9951b897FedDCEe87618c36', // your channel address
            env: 'staging'
          });

          if(apiResponse?.status === 204){
            console.log("Notification sent successfully!")
        }

    }
    catch (err) {
        console.error('Error: ', err);
    }
}

const sendBroadcastNotificationCampaignDonated = async (campaignName, amountDonated) => {
    try {

        const apiResponse = await PushAPI.payloads.sendNotification({
            signer,
            type: 1, // broadcast
            identityType: 2, // direct payload
            notification: {
              title: `New Donation Received`,
              body: `Campaign Name: ${campaignName} Donation Received: ${amountDonated} BOB`,
            },
            payload: {
              title: `New Donation Received`,
              body: `Campaign Name: ${campaignName} Donation Received: ${amountDonated} BOB`,
              cta: '',
              img: ''
            },
            channel: 'eip155:80001:0x0A04d6c616A334d7d9951b897FedDCEe87618c36', // your channel address
            env: 'staging'
          });

          if(apiResponse?.status === 204){
            console.log("Notification sent successfully!")
        }

    }
    catch (err) {
        console.error('Error: ', err);
    }
}

module.exports = {sendBroadcastNotificationCampaignCreated, sendBroadcastNotificationCampaignDonated}