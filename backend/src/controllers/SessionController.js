const User = require('../models/User');

module.exports = {
  async show(req, res) {
    const { user_id } = req.params;

    const user = await User.findById(user_id);

    return res.json(user);
  },

  async store(req, res) {
    const { email } = req.body;

    let user = await User.findOne({ email });

    if (!user) {
      user = await User.create({ email });
    }

    return res.json(user);
  },

  destroy(req, res) {}
};
