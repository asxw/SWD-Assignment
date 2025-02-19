const Juice = require("../models/juiceModel");

exports.getJuiceList = async (req, res) => {

  const items = await Juice.find();

  res.status(200);
  res.json({
    message: 'Juice List',
    result: items
  })

}

exports.createJuice = async (req, res) => {

  const newItem = { id: Date.now(), ...req.body };

  const juice = new Juice(newItem);

  try {

    await juice.save();
    res.status(201).json({
      message: 'Created juice sucessfully.',
      result: juice
    })

  } catch (error) {

    res.status(500).json({
      message: 'Failed to Created juice.',
      result: []
    })

  }

}

exports.getJuiceDetail = async (req, res) => {

  const itemId = parseInt(req.params.id);
  const item = await Juice.findOne({
    brand_code: itemId
  });

  if (!item) {

    res.status(400)
    res.json({
      message: 'Juice not found!',
      result: []
    })

  }

  res.status(200)
  res.json({
    message: 'Juice found!',
    result: item
  })

}

exports.deleteJuice = async (req, res) => {

  const itemId = parseInt(req.params.id);

  try {
    await Juice.deleteOne({
      brand_code: itemId
    });
    res.status(201);
    res.json({
      message: 'Successfully deleted'
    })
  } catch (error) {
    res.status(404);
    res.json({
      message: 'Juice not exit!'
    })
  }

}

exports.updateJuice = async (req, res) => {

  const itemId = parseInt(req.params.id);

  try {

    const item_brand = req.body.brand || item.brand;
    const item_description = req.body.description || item.description;

    await Juice.findOneAndUpdate(
      {
        brand_code: itemId
      },
      {
        $set: {
          brand: item_brand,
          description: item_description
        }
      }
    )

    const updatedJuice = await Juice.findOne({
      brand_code: itemId
    });

    res.status(201);
    res.json(({
      message: "Successfully update juice!",
      result: updatedJuice
    }));

  } catch (error) {

    res.status(404);
    res.json({
      message: 'Juice not exit!'
    })

  }
}

exports.getAdminJuiceList = async (req, res) => {
  const { page = 1, perPage = 5 } = req.query;
  const skip = (page - 1) * perPage;

  try {
    const total = await Juice.countDocuments();
    const items = await Juice.find().skip(skip).limit(parseInt(perPage));

    res.status(200).json({
      data: items ?? [],
      total,
      perPage: parseInt(perPage),
      currentPage: parseInt(page),
      totalPages: Math.ceil(total / perPage)
    });
  } catch (error) {
    if (error instanceof CastError && error.path === 'brand_code') {
      console.error('Error: Encountered CastError for brand_code:', error);
      res.status(500).json({
        message: 'Error fetching juice list',
        error: 'Encountered issues with brand_code data'
      });
    } else {
      console.error('Unexpected error:', error);
      res.status(500).json({
        message: 'Internal server error',
        error: 'An unexpected error occurred'
      });
    }
  }
};

exports.getAdminJuiceDetail = async (req, res) => {
  const { id } = req.params;

  try {
    const item = await Juice.findById(id);

    if (!item) {
      return res.status(404).json({
        message: `Juice item with ID ${id} not found`,
      });
    }

    res.status(200).json({
      data: item,
    });
  } catch (error) {
    if (error.name === 'CastError') {
      console.error('Error: Invalid ID format:', error);
      return res.status(400).json({
        message: 'Invalid ID format',
      });
    } else {
      console.error('Unexpected error:', error);
      res.status(500).json({
        message: 'Internal server error',
        error: 'An unexpected error occurred',
      });
    }
  }
};

// Update juice item (React-Admin API data format)
exports.adminUpdate = async (req, res) => {
  const itemId = req.params.id;
  const { brand, description, brand_code } = req.body;

  if (!brand && !description) {
    return res.status(400).json({
      message: 'At least one field (brand or description) must be provided for update!',
    });
  }

  try {
    const item = await Juice.findById(itemId);

    if (!item) {
      return res.status(404).json({
        message: 'Juice not found!',
      });
    }

    if (brand) item.brand = brand;
    if (brand_code) item.brand_code = brand_code;
    if (description) item.description = description;

    await item.save();

    res.status(200).json({
      data: {
        id: item._id,
        brand_code: item.brand_code,
        brand: item.brand,
        description: item.description,
      },
    });
  } catch (error) {
    console.error('Error updating juice:', error);
    res.status(500).json({
      message: 'Failed to update juice.',
      error: error.message,
    });
  }
};

// Create new juice item (React-Admin API data format)
exports.adminCreate = async (req, res) => {
  const { brand, description, brand_code } = req.body;

  if (!brand || !description) {
    return res.status(400).json({
      message: 'Both brand and description are required!',
    });
  }

  const newItem = { id: Date.now(), brand, brand_code, description };
  const juice = new Juice(newItem);

  try {
    await juice.save();

    res.status(201).json({
      data: {
        id: juice._id,
        brand: juice.brand,
        brand_code: juice.brand_code,
        description: juice.description,
      },
    });
  } catch (error) {
    console.error('Error creating juice:', error);
    res.status(500).json({
      message: 'Failed to create juice.',
      error: error.message,
    });
  }
};

exports.adminDeleteJuice = async (req, res) => {
  const itemId = req.params.id;

  try {
    const item = await Juice.findById(itemId);
    if (!item) {
      return res.status(404).json({
        message: 'Juice not found!',
      });
    }

    await Juice.deleteOne({ _id: itemId });

    res.status(200).json({
      data: {
        id: juice._id,
        brand: juice.brand,
        brand_code: juice.brand_code,
        description: juice.description,
      },
    });
  } catch (error) {
    console.error('Error deleting juice:', error);
    res.status(500).json({
      message: 'Failed to delete juice.',
      error: error.message,
    });
  }
};