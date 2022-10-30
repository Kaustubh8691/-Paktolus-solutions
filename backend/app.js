const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./connection/connect");
const cors = require("cors");
const dataRouter = require("./routes/Blog");
const bodyParser = require('body-parser');

dotenv.config();

const app = express();
app.use(express.json());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
 


app.use(cors());
//  Routes
app.use("/api",dataRouter);

const startDB = async () => {
  try {
    await connectDB(process.env.MONGO_URL);

    const port = process.env.PORT || 5001;
    app.listen(port, () => {
      console.log(`server is running and listening to port - ${port}`);
      console.log("DB connected");
    });
  } catch (error) {
    console.log(error);
  }
};
startDB();
