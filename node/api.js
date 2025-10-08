const express = require('express');
const { GenerateSessionCode } = require('./Sharing');
const cors = require('cors');
const PORT = process.env.PORT || 5000;

const app = express();
app.use(express.json());
app.use(cors());
app.get("/generate_session_code", (req,res) => {
  const code =  GenerateSessionCode();
  res.send(code);
})

app.listen(PORT, () => {
});