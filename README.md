# ETHIndia2k22 Hackathon Submission

## Project zkFundRaise

### Problem Statement
Fundraising on-chain solves a lot of problems when compared to the existing centralized fund-raising model. But even though we obtain decentralization and control over the fundraising process, there is still privacy issues as the on-chain activity is visible to everyone. What if there was a way to fundraise for any particular cause, but not reveal the amount or the account address funding the cause ? 

### Solution
Zk-Bob !!! Making use of Zk-Bob allows us to achieve on-chain privacy by means of ZKP. By using zk-Bob Cloud API we can make payments in stablecoin (BOB) without having to worry about compromising the privacy of the end-users. 


### Features
- Anyone can create a fund-raising campaign, when a campaign is created - each time it generates a new zkBob Address to where the funds can be received. 
- When a campaign receives funds, the identity of the sender and the amount received is not visible on chain - it goes into the pool from where it goes to the campaign's Zk Address. 

### Sponsors Integrated
1. zk-Bob
Here, zk-Bob Cloud API is used to manage two zk-Bob Cloud Accounts. One account represents the campaign creator and the other account represents the donator to the campaign. Various APIs have been used for balances, transfers, etc. 

2. Push Protocol
Push Protocol enables notifications on all activity on this platform - be it campaigns created or funding raised etc. Using Push Protocol and the created channel, users can received push notifications when any activity happens on zkFundRaise enabling better communication.
