const reviewDb = require("../../modals/reviewModal/reviewmodal");

exports.createreview = async (req, res) => {
  const { recipeid } = req.params;

  const { username, ratings, discription } = req.body;

  if (!username || !ratings || !discription) {
    res.status(400).json({ error: "All fields are required" });
  }

  try {
    const reviewdata = new reviewDb({
      recipeid,
      userId: req.userid,
      username,
      ratings,
      discription,
    });
    const reviewStored = await reviewdata.save();
    res.status(200).json(reviewStored);
  } catch (error) {
    res.status(500).json({ error: "catch block error" });
  }
};

exports.updatereview = async (req, res) => {
  const { reviewid } = req.params;

  const { username, ratings, discription } = req.body;

  try {
    const reviewdata = await reviewDb.findByIdAndUpdate(
      { _id: reviewid },
      { username, ratings, discription },
      { new: true }
    );
    res.status(200).json({ msg: "Data update successfully", reviewdata });
  } catch (error) {
    res.status(500).json(error, { error: "catchh block error" });
    console.log(error);
  }
};

exports.getallReviewdata = async (req, res) => {
  const { recipeid } = req.params;

  try {
    const recipedata = await reviewDb.find({ recipeid: recipeid });
    res.status(200).json({ response: "get review data", recipedata });
  } catch (error) {
    res.status(500).json("catch block error getall recipe");
    console.log(error);
  }
};

exports.deleteReview = async (req, res) => { 
  const { reviewid } = req.params;
   
  try {
    const deleteReview = await reviewDb.findByIdAndDelete({ _id: reviewid });
    if (deleteReview) {
      res.status(200).json({ msg: "review deleted successfully " });
    } else {
      res.status(400).json({ error: "Something went gone" });
    }
  } catch (error) {
    res.status(500).json(error);
    console.log(error);
  }
};
