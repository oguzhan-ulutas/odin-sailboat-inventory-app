const asyncHandler = require('express-async-handler');

const Boat = require('../models/boat');
const Designer = require('../models/designer');
const Manufacturer = require('../models/manufacturer');
const Type = require('../models/type');

exports.index = asyncHandler(async (req, res, next) => {
  // Get counts of all collections
  const [numBoats, numDesigners, numManufacturers, numTypes] = await Promise.all([
    Boat.countDocuments({}).exec(),
    Designer.countDocuments({}).exec(),
    Manufacturer.countDocuments({}).exec(),
    Type.countDocuments({}).exec(),
  ]);

  res.render('index', {
    title: 'Boat Inventory',
    numBoats,
    numDesigners,
    numManufacturers,
    numTypes,
  });
});

// Display list of all the boats
exports.boatList = asyncHandler(async (req, res, next) => {
  const allBoats = await Boat.find({}, 'model manufacturer')
    .sort({ model: 1 })
    .populate('manufacturer')
    .exec();
  console.log(allBoats[0].manufacturer[0].name);

  res.render('boat_list', { title: 'Boat List', allBoats });
});

// Display detail page for a specific boat
exports.boatDetail = asyncHandler(async (req, res, next) => {
  // Get boat detail
  const boat = await Boat.findById(req.params.id)
    .populate('manufacturer')
    .populate('type')
    .populate('designer')
    .exec();

  if (boat === null) {
    // No boat
    const err = new Error('Boat is not found.');
    err.status = 404;
    return next(err);
  }

  res.render('boat_detail', {
    title: 'Boat Details',
    boat,
  });
});

// Display boat create form on GET
exports.boatCreateGet = asyncHandler(async (req, res, next) => {
  res.send('NOT IMPLEMENTED: Boat Create GET');
});

// Handle boat create on POST.
exports.boatCreatePost = asyncHandler(async (req, res, next) => {
  res.send('NOT IMPLEMENTED: Boat create POST');
});

// Display boat delete form on GET.
exports.boatDeleteGet = asyncHandler(async (req, res, next) => {
  res.send('NOT IMPLEMENTED: Boat delete GET');
});

// Handle boat delete on POST.
exports.boatDeletePost = asyncHandler(async (req, res, next) => {
  res.send('NOT IMPLEMENTED: Boat delete POST');
});

// Display boat update form on GET.
exports.boatUpdateGet = asyncHandler(async (req, res, next) => {
  res.send('NOT IMPLEMENTED: Boat update GET');
});

// Handle boat update on POST.
exports.boatUpdatePost = asyncHandler(async (req, res, next) => {
  res.send('NOT IMPLEMENTED: Boat update POST');
});
