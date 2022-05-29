const User = require("../models/user");
exports.searchCriteria = async (req, res) => {
  const searchedField = req.params.parameter;
  const searchedUsers = await User.find({
    $or: [
      {
        name: { $regex: `${searchedField}`, $options: "i" },
      },
      { category: { $regex: `${searchedField}`, $options: "i" } },
    ],
  }).limit(5);
  if (!searchedUsers) {
    return res.status(200).json({
      data: "Error in getting users of this category or name",
    });
  }
  return res
    .status(400)
    .json({ data: searchedUsers, message: "Search successfull" });
};
