const express = require('express');
const app = express();
const cors = require("cors")
const path = require('path');

app.use(express.json())
app.use(cors())
const db = require("./models");

//Router
const userRouter = require('./routes/User');
app.use("/auth", userRouter);
const ProductRouter = require('./routes/Products');
app.use("/Products", ProductRouter);
const cartRoutes = require('./routes/Cart');
app.use(cartRoutes);
const PaymentRouter = require('./routes/Payment');
app.use(PaymentRouter);

const appointmentRoutes = require('./routes/Appointment');
app.use("/Appointment", appointmentRoutes);
const WishListRoutes = require('./routes/WishList');
app.use(WishListRoutes);
const InvoiceRoutes = require('./routes/Invoice');
app.use("/Invoice",InvoiceRoutes);
const CateRoutes = require('./routes/Category');
app.use("/cate",CateRoutes);
//app.get('/', async(req, res) => {
//    res.sendFile(path.join(__dirname, '../Bản sao Bijou', 'landing.html'));
//});

db.sequelize.sync().then(() => {
    app.listen(3001, () => {
    console.log('Server running on localhost 3001!') 
})

})