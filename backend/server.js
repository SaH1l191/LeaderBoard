// server.js
// import {app, server,io} from "./socket/socket" 
const { app, server, io } = require("./socket/socket");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");

const userRoutes = require("./routes/users")
const claimRoutes = require("./routes/claims")(io);
require("dotenv").config();


mongoose.connect(process.env.MONGODB_URI);

app.use(cors());
app.use(bodyParser.json());

app.use("/api/users", userRoutes);
app.use("/api/claim", claimRoutes); 



server.listen(5000, () => console.log("Server running on port 5000"));
