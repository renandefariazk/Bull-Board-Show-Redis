const express = require("express");
const Queue = require('bull');
const { createBullBoard } = require("bull-board");
const { BullAdapter } = require("bull-board/bullAdapter");

const app = express();

// URL ilustrativas

const redisConfig = {
  host: "127.0.0.1",
  port: 6379
  // password: "abc1a2b3ad465aa2c1120ac87946ccs8123d321654f0cdb2ear0f3a123e01a001"
};

// Redis 1.0 Connection
// const OrderItem = new Queue("OrderItem", "redis://:pb2cfaeb8a3811d5f12ab0c117ef7b8991a0d9c3b73a00532c6077f1cc689a1e2@ec2-31-286-221-108.compute-1.amazonaws.com:28889");

// New Redis 2.0 TLS/SSL Connection
const OrderItem = new Queue("OrderItem", "rediss://:r12ab2134567ee0d12bb12345a789f2cdca123f0bcc9e442a32cefff32a3308cf@ab2-45-269-234-79.compute-1.amazonaws.com:28319", { 
  redis: { 
    tls: { 
      rejectUnauthorized: false,
      requestCert: true,
      //  agent: false, //(not all clients accept this) some clients need agent: false, (but the version of Bull I'm using doesn't recognise that argument)
    }
  }
});

// Duas Maneira de Fazer Connection
// const OrderItem = new Queue("OrderItem", "redis://127.0.0.1:6379");
// const OrderItem = new Queue("OrderItem", {redis: redisConfig});

// Connection Com Outra Fila
// const Order = new Queue("Order", {redis: redisConfig});

const { router } = createBullBoard([
  new BullAdapter(OrderItem),
  // new BullAdapter(Order) // add outra fila para poder visualizar 
]);


const port = 3000;

app.use("/", router);

app.listen(port, () => {
  console.log("Projeto Iniciado na Port:", port);
});

