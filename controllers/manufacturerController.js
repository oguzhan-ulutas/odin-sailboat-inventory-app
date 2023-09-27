const asyncHandler = require('express-async-handler');
const Manufacturer = require('../models/manufacturer');
const Boat = require('../models/boat');

// Display list of all the manufacturers
exports.manufacturerList = asyncHandler(async (req, res, next) => {
  const allManufacturers = await Manufacturer.find().exec();

  res.render('manufacturer_list', { title: 'Manufacturers', allManufacturers });
});

// Display detail page for a specific manufacturer
exports.manufacturerDetail = asyncHandler(async (req, res, next) => {
  // Get manufacturers and all the boats it produce
  const [manufacturer, boatsManufactured] = await Promise.all([
    Manufacturer.findById(req.params.id).exec(),
    Boat.find({ manufacturer: req.params.id }, 'model type').populate('type').exec(),
  ]);
  console.log(boatsManufactured);

  if (manufacturer === null) {
    const err = new Error('Manufacturer could not found');
    err.status = 404;
    return next(err);
  }

  res.render('manufacturer_detail', {
    title: 'Manufacturer Detail',
    manufacturer,
    boatsManufactured,
  });
});

// Display manufacturer create form on GET
exports.manufacturerCreateGet = asyncHandler(async (req, res, next) => {
  res.send('NOT IMPLEMENTED: Manufacturer Create GET');
});

// Handle manufacturer create on POST.
exports.manufacturerCreatePost = asyncHandler(async (req, res, next) => {
  res.send('NOT IMPLEMENTED: Manufacturer create POST');
});

// Display manufacturer delete form on GET.
exports.manufacturerDeleteGet = asyncHandler(async (req, res, next) => {
  res.send('NOT IMPLEMENTED: Manufacturer delete GET');
});

// Handle manufacturer delete on POST.
exports.manufacturerDeletePost = asyncHandler(async (req, res, next) => {
  res.send('NOT IMPLEMENTED: Manufacturer delete POST');
});

// Display manufacturer update form on GET.
exports.manufacturerUpdateGet = asyncHandler(async (req, res, next) => {
  res.send('NOT IMPLEMENTED: Manufacturer update GET');
});

// Handle manufacturer update on POST.
exports.manufacturerUpdatePost = asyncHandler(async (req, res, next) => {
  res.send('NOT IMPLEMENTED: Manufacturer update POST');
});
