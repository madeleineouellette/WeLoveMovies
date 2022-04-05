const theatersService = require("./theaters.service");

async function list(req, res) {
    const data = await theatersService.list();
    res.json({ data });
  }

  module.exports = {
    list,
};
