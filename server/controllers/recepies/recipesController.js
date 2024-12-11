const recipeDb = require("../../modals/recipeModal/recipeModal");
const cloudinary = require("../../cloudinary/cloudinary");

//  create recipe controller
exports.createRecipe = async (req, res) => {
  const file = req.file ? req.file.path : "";
  const { recipename, discription, ingradients, instruction, cookingtime } = req.body;

  // Validate input fields
  if (!recipename || !discription || !ingradients  || !cookingtime || !file) {
    return res.status(400).json({ error: "Please provide all details" });
  }
  const ingredientsArray = JSON.parse(ingradients);
  try {
    // Upload the file to Cloudinary
    const upload = await cloudinary.uploader.upload(file);

    // Create recipe data object
    const recipedata = new recipeDb({
      userId: req.userid, // Make sure this is set correctly
      recipename,
      discription,
      ingradients : ingredientsArray,
      cookingtime,
      instruction,
      recipeImg: upload.secure_url, // Save the Cloudinary URL
    });

    // Save recipe data to database
    await recipedata.save();
    
    // Send response with success message and the saved recipe data
    res.status(200).json({ msg: "Recipe created successfully", recipedata });
  } catch (error) {
    // Handle unexpected errors
    console.error(error);
    res.status(500).json({ error: "Server error while creating recipe", details: error.message });
  }
};

// update recipe
exports.updateRecipe = async (req, res) => {
  const { id } = req.params;
  const file = req.file ? req.file.path : "";

  const { recipename, discription, ingradients, instruction, cookingtime } =
    req.body;
  if (!recipename || !discription || !ingradients || !cookingtime || !file) {
    res.status(400).json("Please provide all details");
  }

  var upload;

  try {
    if (file) {
      upload = await cloudinary.uploader.upload(file);
    }
    const updatedata = await recipeDb.findByIdAndUpdate(
      { _id: id },
      { recipename, discription, ingradients, instruction, cookingtime },
      { new: true }
    );
    res
      .status(200)
      .json({ response: "Recipe data update successfuly updated", updatedata });
  } catch (error) {
    res.status(500).json("catch block error update recipe");
    console.log(error);
  }
};

//  delete recipe
exports.deleterecipe = async (req, res) => {
  const { id } = req.params;

  try {
    const response = await recipeDb.findByIdAndDelete(id);
    if (response) {
      res.status(200).json({ msg: "recipe successfully deleted", response });
    } else {
      res.status(400).json({ response: "Recipe not found" });
    }
  } catch (error) {
    res.status(500).json("catch block error delete recipe");
    console.log(error);
  }
};

// get all recipes
exports.getSinglerecipe = async (req, res) => {
  const { id } = req.params;
  try {
    const recipedata = await recipeDb.findById({ _id: id });
    res.status(200).json({ response: "Get  recipe", recipedata });
  } catch (error) {
    res.status(500).json("catch block error getall recipe");
    console.log(error);
  }
};

exports.getAlldatawithserchpagination = async (req, res) => {
  const { search, page } = req.query;
  const searchValue = search || "";
  const pageNum = page && page > 0 ? page : 1;
  const Item_per_page = 6;

  // const query = {
  //   recipename: { $regex: searchValue, $options: "i" },
  // };
  const query = searchValue
    ? { recipename: { $regex: searchValue, $options: "i" } }
    : {};

  try {
    // skip
    const skip = (pageNum - 1) * Item_per_page;

    // recipe count
    const recipecount = await recipeDb.countDocuments(query);

    // page count
    const pageCount = Math.ceil(recipecount / Item_per_page);

    // all recipe data
    const allRecipedata = await recipeDb.aggregate([
      {
        $match: query,
      },
      {
        $skip: skip,
      },
      {
        $limit: Item_per_page,
      },
      {
        $lookup: {
          from: "users",
          localField: "userId",
          foreignField: "_id",
          as: "userData",
        },
      },
    ]);

    res.status(200).json({
      recipedata: allRecipedata,
      pagination: {
        recipecount,
        pageCount,
      },
    });
  } catch (error) {
    res.status(500).json(error);
    console.log(error);
  }
};
