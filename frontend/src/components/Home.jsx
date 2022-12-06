import { useState, useEffect } from 'react';
import { Container, Row, Col, ProgressBar, Button, Modal, Form } from 'react-bootstrap'



function Home() {

    const [allCampaigns, setAllCampaigns] = useState([]);
    const [accountBalance, setAccountBalance] = useState(0);
    const [showCreateCampaignModal, setShowCreateCampaignModal] = useState(false);
    const [showFundCampaignModal, setShowFundCampaignModal] = useState(false);
    const [campaignName, setCampaignName] = useState("");
    const [campaignDescription, setCampaignDescription] = useState("");
    const [campaignTargetAmount, setCampaignTargetAmount] = useState(0);

    const [fundAmount, setFundAmount] = useState(0);
    const [campaignZkAddress, setCampaignZkAddress] = useState("");
    const [campaignId, setCampaignId] = useState(0);

    useEffect(() => {
        getAllCampaigns();
    }, []);

    const handleCloseCreateCampaignModal = () => setShowCreateCampaignModal(false);
    const handleShowCreateCampaignModal = () => setShowCreateCampaignModal(true);

    const handleCloseFundCampaignModal = () => setShowFundCampaignModal(false);
    const handleShowFundCampaignModal = (campaign_id, campaign_zk_address) => {
        setShowFundCampaignModal(true)
        setCampaignId(campaign_id)
        setCampaignZkAddress(campaign_zk_address)
    };
    
    
    async function getAllCampaigns() {
        const response = await fetch('http://localhost:4000/api/getAllCampaigns');
        const data = await response.json();
        console.log(data);
        // show newly created campaign on top
        // filter out campaigns which have raised more than required
        setAllCampaigns(data.reverse());
        const response2 = await fetch('http://localhost:4000/api/getBobBalance');
        const data2 = await response2.json();
        setAccountBalance(data2.balance)
        return data;
    }

    async function createCampaign() {
        console.log(campaignName)
        console.log(campaignDescription)
        console.log(campaignTargetAmount)

        const response = await fetch('http://localhost:4000/api/createCampaign',{
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "campaignCreatorEvmAddress":"test",
                "amountReq": campaignTargetAmount,
                "campaignName": campaignName,
                "campaignDesc": campaignDescription,
          })})
          if(response.status === 200){
            console.log("Request sent successfully")

            // refresh the page
            getAllCampaigns();
          }
    }

    async function fundCampaign() {
        console.log("fund campaign")
        console.log(fundAmount)
        console.log(campaignId)
        console.log(campaignZkAddress)

        if(fundAmount > accountBalance){
            alert("Insufficient balance, please ensure you have sufficient BOB tokens to fund !")
            return
        }


        const response = await fetch('http://localhost:4000/api/donateToCampaign',{
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "campaignId": campaignId,
                "amountDonated": fundAmount,
                "campaignZkAddress": campaignZkAddress,
          })})
          if(response.status === 200){
            console.log(response)
            alert("Transaction submitted to relayer !")
            console.log("Request sent successfully")

            // refresh the page
            getAllCampaigns();
          }


    }



  return (
    <>

    <Modal centered show={showCreateCampaignModal} onHide={handleCloseCreateCampaignModal}>
        <Modal.Header closeButton>
          <Modal.Title>Create New Campaign</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <Form>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Campaign Name</Form.Label>
        <Form.Control onChange={(e)=>setCampaignName(e.target.value)} type="text" placeholder="Enter campaign name" />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Campaign Description</Form.Label>
        <Form.Control onChange={(e)=>setCampaignDescription(e.target.value)} type="text" placeholder="Enter campaign Description" />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Enter campaign target amount</Form.Label>
        <Form.Control onChange={(e)=>setCampaignTargetAmount(e.target.value)} type="text" placeholder="Enter campaign amount required" />
      </Form.Group>


      

      
    </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseCreateCampaignModal}>
            Close
          </Button>
          <Button variant="primary" onClick={()=>{
                handleCloseCreateCampaignModal();
                createCampaign();
          }}>
            Create Campaign
          </Button>
        </Modal.Footer>
      </Modal>


      <Modal centered show={showFundCampaignModal} onHide={handleCloseFundCampaignModal}>
        <Modal.Header closeButton>
          <Modal.Title>Fund Campaign</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <Form>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Enter amount you'd like to fund this campaign</Form.Label>
        <Form.Control onChange={(e)=>setFundAmount(e.target.value)} type="text" placeholder="Enter amount to fund in $BOB" />
      </Form.Group>

      
    </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseFundCampaignModal}>
            Close
          </Button>
          <Button variant="primary" onClick={()=>{
                handleCloseFundCampaignModal();
                fundCampaign();
          }}>
            Fund Campaign
          </Button>
        </Modal.Footer>
      </Modal>


        <Container id='dapp-home' fluid style={{minHeight:"1000px", overflow:"hidden", color:"white", fontFamily:""}}>
        <Row style={{fontFamily:"", padding:"1%", paddingBottom:"0px"}}>
          <Col md={9}>
            <h3 style={{fontWeight:"bolder"}}>zkFundRaise  💵</h3>
          </Col>
          <Col md={3} style={{textAlign:"right"}}>
            <h5>User $BOB Balance: {accountBalance } BOB</h5>
          </Col>
        </Row>
        <Row style={{fontFamily:"", padding:"1%", paddingTop:"0px", paddingBottom:"0px"}}>
          <p> Create and donate to campaigns anonymously using BOB Stablecoin! Your on-chain transaction data is hidden using Zk-Bob Protocol ! Receive notifications when your created campaign receives funding ! </p>
        </Row>
        <hr />

        <Row style={{padding:"2%"}}>
        <Row>
            <Col md={2}>
            <h4 style={{marginBottom:"2%", textAlign:"left"}}>Active Campaigns</h4>
            </Col>
            <Col md={4} style={{textAlign:"left"}}>
            </Col>
            <Col style={{textAlign:"right"}} md={6}>
            <Button onClick={()=>{
                handleShowCreateCampaignModal();
            }} variant="warning">Create New Campaign</Button>{' '}
            </Col>
        </Row>
        <br />
        <br />
        <br />

        {allCampaigns.map((campaign, index) => (
            campaign.amountRaised < campaign.amountReq && <Row key={index} style={{padding:"1%", marginBottom:"2%", border:"1px solid white", borderRadius:"20px"}}>
                <Col md={10}>
                    <h5 style={{fontWeight:"bolder"}}>Campaign Name: {campaign.campaignName}</h5>
                    <ProgressBar variant="success" animated now={(campaign.amountRaised / campaign.amountReq)*100} label={`${(Math.ceil(campaign.amountRaised / campaign.amountReq*100))}%`} />
                    <hr />
                    <h6>Campaign ID: {campaign._id}</h6>
                    <h6>Description: {campaign.campaignDesc}</h6>
                    <h6>Goal: {campaign.amountReq} BOB</h6>
                    <h6>Raised: {campaign.amountRaised} BOB</h6>
                    <h6>Campaign Donate ZkAddress: {campaign.campaignZkAddress}</h6>
                    {campaign.amountRaised < campaign.amountReq && <Button onClick={()=>{
                        handleShowFundCampaignModal(campaign._id, campaign.campaignZkAddress);
                    }} variant="success">Fund Campaign</Button>}
                </Col>
            </Row>
        ))}

        <br />
        <br />
        <br />
        <hr />
        <br />
    
        <h4 style={{marginBottom:"2%", textAlign:"left"}}>Completed Campaigns</h4>

        {allCampaigns.map((campaign, index) => (
            campaign.amountRaised > campaign.amountReq && <Row key={index} style={{padding:"1%", marginBottom:"2%", border:"1px solid white", borderRadius:"20px"}}>
                <Col md={10}>
                    <h5 style={{fontWeight:"bolder"}}>Campaign Name: {campaign.campaignName}</h5>
                    <ProgressBar variant="success" animated now={(campaign.amountRaised / campaign.amountReq)*100} label={`${(Math.ceil(campaign.amountRaised / campaign.amountReq*100))}%`} />
                    <hr />
                    <h6>Campaign ID: {campaign._id}</h6>
                    <h6>Description: {campaign.campaignDesc}</h6>
                    <h6>Goal: {campaign.amountReq} BOB</h6>
                    <h6>Raised: {campaign.amountRaised} BOB</h6>
                    <h6>Campaign Donate ZkAddress: {campaign.campaignZkAddress}</h6>
                    {campaign.amountRaised < campaign.amountReq && <Button onClick={()=>{
                        handleShowFundCampaignModal(campaign._id, campaign.campaignZkAddress);
                    }} variant="success">Fund Campaign</Button>}
                </Col>
            </Row>
        ))}
        </Row>


        </Container>
    </>
  );
}

export default Home;