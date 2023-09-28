const asyncHandler = require('express-async-handler');
const { body, validationResult } = require('express-validator');

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
  // Get all designers, manufacturers and types
  const [allManufacturers, allDesigners, allTypes] = await Promise.all([
    Manufacturer.find().exec(),
    Designer.find().exec(),
    Type.find().exec(),
  ]);
  res.render('boat_form', {
    title: 'Create Boat',
    allManufacturers,
    allDesigners,
    allTypes,
  });
});

// Handle boat create on POST.
exports.boatCreatePost = [
  // Convert manufacturer to an array
  (req, res, next) => {
    if (!(req.body.manufacturer instanceof Array)) {
      if (typeof req.body.manufacturer === 'undefined') req.body.manufacturer = [];
      else req.body.manufacturer = new Array(req.body.manufacturer);
    }
    next();
  },

  // Convert designer to an array
  (req, res, next) => {
    if (!(req.body.designer instanceof Array)) {
      if (typeof req.body.designer === 'undefined') req.body.designer = [];
      else req.body.designer = new Array(req.body.designer);
    }
    next();
  },

  // Convert type to an array
  (req, res, next) => {
    if (!(req.body.type instanceof Array)) {
      if (typeof req.body.type === 'undefined') req.body.type = [];
      else req.body.type = new Array(req.body.type);
    }
    next();
  },

  // Validate and sanitize form data
  body('model').trim().isLength({ min: 1 }).escape().withMessage('Model name must be specified.'),
  body('manufacturer').trim().isLength({ min: 1 }).escape(),
  body('designer').trim().isLength({ min: 1 }).escape(),
  body('type').trim().isLength({ min: 1 }).escape().withMessage('Model name must be specified.'),
  body('displacement').trim().isLength({ min: 1 }).escape(),
  body('beam').trim().isLength({ min: 1 }).escape(),
  body('ballast').trim().isLength({ min: 1 }).escape(),

  asyncHandler(async (req, res, next) => {
    // Extract the validation errors from a request.
    const errors = validationResult(req);

    // Create Designer object with escaped and trimmed data
    const boat = new Boat({
      model: req.body.model,
      manufacturer: req.body.manufacturer,
      designer: req.body.designer,
      type: req.body.type,
      displacement: req.body.displacement,
      beam: req.body.beam,
      ballast: req.body.ballast,
    });

    if (!errors.isEmpty()) {
      // There is errors redirect to designer create form
      // Get all designers, manufacturers and types
      const [allManufacturers, allDesigners, allTypes] = await Promise.all([
        Manufacturer.find().exec(),
        Designer.find().exec(),
        Type.find().exec(),
      ]);
      res.render('boat_form', {
        title: 'Create Boat',
        allManufacturers,
        allDesigners,
        allTypes,
        boat,
        errors: errors.array(),
      });
    } else {
      // Data is valid

      // Check if boat exist in database
      const boatExist = await Boat.findOne({
        model: boat.model,
      }).exec();
      if (boatExist) {
        // Boat exist redirect to manufacturer detail page
        res.redirect(boatExist.url);
      } else {
        // Save boat
        await boat.save();
        // Redirect to new boat page
        res.redirect(boat.url);
      }
    }
  }),
];

// Display boat delete form on GET.
exports.boatDeleteGet = asyncHandler(async (req, res, next) => {
  // Get detail of boat
  const boat = await Boat.findById(req.params.id).populate('manufacturer designer type').exec();

  if (boat === null) {
    // No boat, redirect to boat list page
    res.redirect('/catalog/boats');
  }

  res.render('boat_delete', {
    title: 'Delete Boat',
    boat,
  });
});

// Handle boat delete on POST.
exports.boatDeletePost = asyncHandler(async (req, res, next) => {
  // Delete boat
  await Boat.findByIdAndRemove(req.body.boatId);
  res.redirect('/catalog/boats');
});

// Display boat update form on GET.
exports.boatUpdateGet = asyncHandler(async (req, res, next) => {
  // Get boat, all designers, manufacturers and types
  const [boat, allManufacturers, allDesigners, allTypes] = await Promise.all([
    Boat.findById(req.params.id),
    Manufacturer.find().exec(),
    Designer.find().exec(),
    Type.find().exec(),
  ]);

  if (boat === null) {
    // No results.
    const err = new Error('Boat not found');
    err.status = 404;
    return next(err);
  }

  res.render('boat_form', {
    title: 'Update Boat',
    boat,
    allDesigners,
    allManufacturers,
    allTypes,
  });
});

// Handle boat update on POST.
exports.boatUpdatePost = [
  // Convert manufacturer to an array
  (req, res, next) => {
    if (!(req.body.manufacturer instanceof Array)) {
      if (typeof req.body.manufacturer === 'undefined') req.body.manufacturer = [];
      else req.body.manufacturer = new Array(req.body.manufacturer);
    }
    next();
  },

  // Convert designer to an array
  (req, res, next) => {
    if (!(req.body.designer instanceof Array)) {
      if (typeof req.body.designer === 'undefined') req.body.designer = [];
      else req.body.designer = new Array(req.body.designer);
    }
    next();
  },

  // Convert type to an array
  (req, res, next) => {
    if (!(req.body.type instanceof Array)) {
      if (typeof req.body.type === 'undefined') req.body.type = [];
      else req.body.type = new Array(req.body.type);
    }
    next();
  },

  // Validate and sanitize form data
  body('model').trim().isLength({ min: 1 }).escape().withMessage('Model name must be specified.'),
  body('manufacturer').trim().isLength({ min: 1 }).escape(),
  body('designer').trim().isLength({ min: 1 }).escape(),
  body('type').trim().isLength({ min: 1 }).escape().withMessage('Model name must be specified.'),
  body('displacement').trim().isLength({ min: 1 }).escape(),
  body('beam').trim().isLength({ min: 1 }).escape(),
  body('ballast').trim().isLength({ min: 1 }).escape(),

  asyncHandler(async (req, res, next) => {
    // Extract the validation errors from a request.
    const errors = validationResult(req);

    // Create Designer object with escaped and trimmed data
    const boat = new Boat({
      model: req.body.model,
      manufacturer: req.body.manufacturer,
      designer: req.body.designer,
      type: req.body.type,
      displacement: req.body.displacement,
      beam: req.body.beam,
      ballast: req.body.ballast,
      _id: req.params.id,
    });

    if (!errors.isEmpty()) {
      // There is errors redirect to designer create form
      // Get all designers, manufacturers and types
      const [allManufacturers, allDesigners, allTypes] = await Promise.all([
        Manufacturer.find().exec(),
        Designer.find().exec(),
        Type.find().exec(),
      ]);
      res.render('boat_form', {
        title: 'Update Boat',
        allManufacturers,
        allDesigners,
        allTypes,
        boat,
        errors: errors.array(),
      });
    } else {
      // Data is valid
      // Update boat
      const updatedBoat = await Boat.findByIdAndUpdate(req.params.id, boat, {});
      // Redirect to new boat page
      res.redirect(updatedBoat.url);
    }
  }),
];
