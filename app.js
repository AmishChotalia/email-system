require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const emailRoutes = require("./routes/emailRoutes");
const { processQueue } = require("./utils/queue");

const app = express();
app.use(express.json());

mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("MongoDB connection error:", err));

app.use("/api/email", emailRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);

  // Function to process the queue
  const processQueuePeriodically = async () => {
    try {
      console.log("Processing email queue...");
      await processQueue();
      console.log("Queue processed successfully");
    } catch (err) {
      console.error("Error processing queue:", err);
    }
  };

  // Process the queue every 10 seconds
  const interval = 10 * 1000;
  setInterval(processQueuePeriodically, interval);

  // Initial queue processing on startup
  processQueuePeriodically();
});
