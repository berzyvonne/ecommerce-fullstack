const express = require("express");
const app = express();
const productRoute = require("../server/routes/product");
const userRoute = require("../server/routes/user");
const shopping_cart = require("../server/routes/shopping_cart");
const runSeed = require("./runseed");
const cors = require("cors");

app.use(cors());
app.use(express.json());
// const port = 8000

app.get("/", (req, res) => {
  res.send("Hello world");
});

app.use("/api/products", productRoute);
app.use("/api/user", userRoute);
app.use("/api/cart", shopping_cart);

const init = async () => {
  //runSeed function
  const port = (process.env.PORT = 8000);

  app.listen(port, () => {
    console.log(`listening on port ${port}`);
  });
};

if (process.env.RUN_SEED === "true") {
  runSeed()
    .then(() => {
      console.log("Database seeded successfully");
      init();
    })
    .catch((err) => {
      console.error("Error seeding database:", err);
      process.exit(1);
    });
} else {
  init();
}
