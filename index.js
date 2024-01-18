const app = require("./server");
const mongoose = require('mongoose');
const PORT = process.env.PORT || 3500;


mongoose.connection.once('open', () => {
    
    console.log("Connected to MongoDB");
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
})
