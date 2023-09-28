const asyncHandler = require('express-async-handler');
const { body, validationResult } = require('express-validator');
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
  res.render('manufacturer_form', { title: 'Create Manufacturer' });
});

// Handle manufacturer create on POST.
exports.manufacturerCreatePost = [
  // Validate and sanitize the fields
  body('name')
    .trim()
    .isLength({ min: 3 })
    .escape()
    .withMessage('Name must be specified.')
    .isAlphanumeric()
    .withMessage('Name has non-alphanumeric characters.'),
  body('country')
    .trim()
    .isLength({ min: 1 })
    .escape()
    .isAlphanumeric()
    .withMessage('Name has non-alphanumeric characters.'),
  body('city')
    .trim()
    .isLength({ min: 1 })
    .escape()
    .isAlphanumeric()
    .withMessage('Name has non-alphanumeric characters.'),

  // Process req. after validation and sanitization
  asyncHandler(async (req, res, next) => {
    // extract erros from form request
    const errors = validationResult(req);

    // Create new manufacturer obj from form data
    const manufacturer = new Manufacturer({
      name: req.body.name,
      country: req.body.country,
      city: req.body.city,
    });

    if (!errors.isEmpty()) {
      // There is errors redirect to manufacturer create form
      res.render('manufacturer_form', {
        title: 'Create Manufacturer',
        manufacturer,
        errors: errors.array(),
      });
    } else {
      // Data is valid

      // Check if manufacturer exist in database
      const manufacturerExist = await Manufacturer.findOne({ name: manufacturer.name }).exec();
      if (manufacturerExist) {
        // Manufacturer exist redirect to manufacturer detail page
        res.redirect(manufacturerExist.url);
      } else {
        // Save manufacturer
        await manufacturer.save();
        // Redirect to new manufacturer page
        res.redirect(manufacturer.url);
      }
    }
  }),
];

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
