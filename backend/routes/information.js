const express = require("express");
const router = express.Router();

let Information = require("../model/information.js");

/**
 * Add information if the required field is not empty.
 */
router.post("/add", async function (req, res) {
  req.assert("content", "Information: content must be set").notEmpty();

  let errors = req.validationErrors();

  if (errors) {
    return res.status(400).json({
      status: "error",
      message: "Mandatory field is not set",
    });
  }
  try {
    const information = new Information(req.body);
    await information.save();
    return res
      .status(200)
      .json({
        message: "information successfully added",
        information: information,
      });
  } catch (error) {
    return res.status(500).json({
      status: "error",
      message: "Internal Server Error",
    });
  }
});

/**
 * Edit information of a specific information (given the information id)
 */
router.post("/edit/:id", async function (req, res) {
  let eventBody = req.body;
  let query = { _id: req.params.id };

  if (Object.keys(eventBody).length === 0) {
    return res.status(400).json({
      status: "error",
      message: "No field to update with",
    });
  }

  try {
    const information = await Information.updateOne(query, eventBody);
    return res
      .status(200)
      .json({
        msg: "information successfully updated",
        information: information,
      });
  } catch (e) {
    return res.status(500).json(e);
  }
});

/**
 * Get all information
 */
router.get("/", async function (req, res) {
  try {
    const information = await Information.find({}).sort({
      order: 1
    });
    return res.status(200).json(information);
  } catch (e) {
    return res.status(500).json(e);
  }
});

/**
 * Get information (given the information id)
 */
router.get("/:id", async function (req, res) {
  let id = req.params.id;

  try {
    const information = await Information.findById(id);
    return res.status(200).json({ information: information });
  } catch (e) {
    return res.status(500).json({ message: "information not found" });
  }
});

/**
 * Delete the information of a specific information (given the information id)
 */
router.delete("/:id", async function (req, res) {
  let query = { _id: req.params.id };

  try {
    await Information.deleteOne(query);
    return res.status(200).json({ message: "information deleted successfully!" });
  } catch (e) {
    return res.status(500).json({ message: "information was not deleted" });
  }
});

// /**
//  * Fetch the information and organize into an array of pages and data
//  */
// router.post("/fetch", async function (req, res) {
//   try {
//     const pages = [];
//     const data = [];
//     const information = await Information.find({});
//     information.forEach((i) => {
//       pages.push(i.title);

//       data.push({
//         title: i.title,
//         content: i.content,
//         imageTop: i.imageTop,
//         imageBottom: i.imageBottom,
//       });
//     });
//     return res.status(200).json({pages: pages, data: data})
//   } catch (e) {
//     return res.status(500).json({ message: "information not found" });
//   }
// });

// /**
//  * Reorder the pages by
//  */
//  router.post("/updatePages", async function (req, res) {
//   try {

//     return res.status(200).json({pages: pages, data: data})
//   } catch (e) {
//     return res.status(500).json({ message: "information not found" });
//   }
// });

module.exports = router;
