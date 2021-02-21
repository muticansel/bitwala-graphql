var express = require("express");
var { graphqlHTTP } = require("express-graphql");
var { buildSchema } = require("graphql");
const cors = require("cors");
const axios = require("axios");

// Construct a schema, using GraphQL schema language
var schema = buildSchema(`
  type Block {
    hash: String,
    height: Int,
    time: Int
  }

  type Transaction {
    hash: String,
    ver: Int,
    size: Int,
    weight: Int,
    block_height: Int
  }

  type BlockDetail {
      size: Int,
      block_index: Int,
      prev_block: String,
      height: Int,
      time: Int
      tx: [Transaction]
  }

  type Query {
    getBlocks: [Block],
    getBlockDetail(hash: String!): BlockDetail
  }
`);

// The root provides a resolver function for each API endpoint
var root = {
  getBlocks: async () => {
    const url = "https://blockchain.info/blocks?format=json";
    const response = await axios.get(url);
    return response.data.blocks;
  },
  getBlockDetail: async ({ hash }) => {
    const url = `https://blockchain.info/rawblock/${hash}`;
    const response = await axios.get(url);
    return response.data;
  },
};

var app = express();
app.use(cors());
app.use(
  "/graphql",
  graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphiql: true,
  })
);

app.get("/blocks/:hash", async (req, res) => {
  const { hash } = req.params;
  const url = `https://blockchain.info/rawblock/${hash}`;
  const response = await axios.get(url);
  res.send(response.data);
});

app.listen(5000, () => {
  console.log("Running a GraphQL API server at http://localhost:5000/graphql");
});
