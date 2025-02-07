const express = require("express");
const app = express();
const routes = require('./routes/routes');
const cors = require("cors");
require("dotenv").config();
const sequelize = require("./config/config");
const { createTopicIfNotExists } = require("./utils/admin");
const { initRedis } = require("./config/redisConfig");
require('./models/userDetails.model');
require('./models/userSession.model');
require('./jobs/tokenDelete.cron');
app.use(cors());
app.use(express.json());
app.use('/api/auth', routes);

app.get("/health", (req, res) => {
  try {
    res.status(200).json({ message: "Server is running" });
  } catch (err) {
    console.log("Error in getting data", err);
    res.status(500).send("Internal Server Error");
    return;
  }
});


const port = process.env.PORT || 5000;

const startServer=async()=>{
  try{
    const port = process.env.PORT || 5000;
    await sequelize.authenticate();
    console.log('Database connection has been established successfully.');
     await sequelize.sync({ alter: true });
    console.log('Database synced successfully.');

   await createTopicIfNotExists("generate_otp", 1);
   await initRedis();
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  }catch(err){
    console.log("Error in starting server",err);
  }
}

startServer();