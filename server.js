const express = require("express");
const cors = require("cors");

require('dotenv').config();
const app = express();

let corsOptions = {
    origin: "http://localhost:8094",

};

app.use(cors()); // all domains and ports can access this backend

app.use(express.json()); 

app.use(express.urlencoded({ extended: true})); 

const db = require("./app/models/"); // open index.js

db.mongoose.connect(process.env.MONGO_URI, 
    { useNewUrlParser: true, }
).then(() => {
        console.log("Successfully connect to MongoDB");
    })
    .catch(err => {
        console.error("Connection error", err);
        process.exit();
    })

app.get("/", (req, res) => { 
    res.json({ message: "Hello"}); 
})

require("./app/routes/user.routes")(app); 
require("./app/routes/item.routes")(app);
require("./app/routes/cart.routes")(app);

const PORT = process.env.PORT || 8094; // set port, listen for requests
app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}.`);
})

