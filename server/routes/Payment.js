const express = require("express");
const cors = require("cors");
const bodyParser = require('body-parser');
const crypto = require('crypto');
const axios = require('axios');

const router = express.Router();
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));
router.use(cors()); // Add this line to enable CORS

router.post("/payment", async (req, res) => {
    const { amount } = req.body;
    const { orderInfo } = req.body
    console.log('Payment request received with amount:', amount);
    const partnerName = "Jelwery";
    const accessKey = 'F8BBA842ECF85';
    const secretKey = 'K951B6PE1waDMi640xX08PD3vg6EkVlz';
    // const orderInfo = 'Jelwery';
    const partnerCode = 'MOMO';
    const redirectUrl = 'http://127.0.0.1:5502/B%E1%BA%A3n%20sao%20Bijou/landingPage.html';
    const ipnUrl = 'https://754a-14-241-237-150.ngrok-free.app/callback';
    const requestType = "payWithMethod";
    const orderId = partnerCode + new Date().getTime();
    const requestId = orderId;
    const extraData = '';
    const orderGroupId = '';
    const autoCapture = true;
    const lang = 'vi';

    const rawSignature = `accessKey=${accessKey}&amount=${amount}&extraData=${extraData}&ipnUrl=${ipnUrl}&orderId=${orderId}&orderInfo=${orderInfo}&partnerCode=${partnerCode}&redirectUrl=${redirectUrl}&requestId=${requestId}&requestType=${requestType}`;
    console.log("--------------------RAW SIGNATURE----------------");
    console.log(rawSignature);

    const signature = crypto.createHmac('sha256', secretKey)
        .update(rawSignature)
        .digest('hex');
    console.log("--------------------SIGNATURE----------------");
    console.log(signature);

    const requestBody = {
        partnerCode: partnerCode,
        partnerName: partnerName,
        storeId: "MomoTestStore",
        requestId: requestId,
        amount: amount,
        orderId: orderId,
        orderInfo: orderInfo,
        redirectUrl: redirectUrl,
        ipnUrl: ipnUrl,
        lang: lang,
        requestType: requestType,
        autoCapture: autoCapture,
        extraData: extraData,
        orderGroupId: orderGroupId,
        signature: signature
    };

    const options = {
        method: "POST",
        url: "https://test-payment.momo.vn/v2/gateway/api/create",
        headers: {
            'Content-Type': 'application/json',
        },
        data: requestBody
    };

    try {
        const result = await axios(options);
        console.log('Response from MoMo:', result.data);
        return res.status(200).json(result.data);
    } catch (error) {
        console.error('Error during payment initiation:', error);
        return res.status(500).json({
            statusCode: 500,
            message: "server error"
        });
    }
});

router.post('/callback', (req, res) => {
    console.log('Callback received:');
    console.log(req.body);
    return res.status(204).json(req.body);
});

router.post('/status-transaction', async (req, res) => {
    const accessKey = 'F8BBA842ECF85';
    const secretKey = 'K951B6PE1waDMi640xX08PD3vg6EkVlz';
    const { orderId } = req.body;
    console.log('Status check for order ID:', orderId);

    const rawSignature = `accessKey=${accessKey}&orderId=${orderId}&partnerCode=MOMO&requestId=${orderId}`;

    const signature = crypto
        .createHmac('sha256', secretKey)
        .update(rawSignature)
        .digest('hex');

    const requestBody = {
        partnerCode: 'MOMO',
        requestId: orderId,
        orderId: orderId,
        signature: signature,
        lang: 'vi',
    };

    const options = {
        method: 'POST',
        url: 'https://test-payment.momo.vn/v2/gateway/api/query',
        headers: {
            'Content-Type': 'application/json',
        },
        data: requestBody,
    };

    try {
        const result = await axios(options);
        console.log('Status response from MoMo:', result.data);
        return res.status(200).json(result.data);
    } catch (error) {
        console.error('Error during status check:', error);
        return res.status(500).json({
            statusCode: 500,
            message: "server error"
        });
    }
});

module.exports = router;
