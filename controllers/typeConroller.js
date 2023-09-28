const asyncHandler = require('express-async-handler');
const { body, validationResult } = require('express-validator');

const Type = require('../models/type');
const Boat = require('../models/boat');

// Display list of all the types
exports.typeList = asyncHandler(async (req, res, next) => {
  const allTypes = await Type.find().exec();

  res.render('type_list', { title: 'Boat Type List', allTypes });
});

// Display detail page for a specific type
exports.typeDetail = asyncHandler(async (req, res, next) => {
  // Get type and all the boats on that type
  const [type, boatsInType] = await Promise.all([
    Type.findById(req.params.id).exec(),
    Boat.find({ type: req.params.id }, 'model manufacturer').populate('manufacturer').exec(),
  ]);

  if (type === null) {
    // No type
    const err = new Error('Type is not found');
    err.status = 404;
    return next(err);
  }

  res.render('type_detail', {
    title: 'Type Detail',
    type,
    boatsInType,
  });
});

// Display type create form on GET
exports.typeCreateGet = (req, res, next) => {
  res.render('type_form', { title: 'Create Type' });
};
// Handle type create on POST.
exports.typeCreatePost = [
  // Validate and sanitize name field
  body('name', 'Type must be at least 3 characters').trim().isLength({ min: 3 }).escape(),

  // Process request after validation and sanitization.
  asyncHandler(async (req, res, next) => {
    // Extract the validation errors from a request
    const errors = validationResult(req);

    // Create a type object with escaped and trimmed data
    const type = new Type({ name: req.body.name });

    if (!errors.isEmpty()) {
      // There is errors render form again
      res.render('type_form', {
        title: 'Create Type',
        type,
        errors: errors.array(),
      });
    } else {
      // Data from the form is valid
      // Check if is there same type
      const typeExist = await Type.findOne({ name: req.body.name }).exec();
      if (typeExist) {
        // Redirect to type detail page
        res.redirect(typeExist.url);
      } else {
        await type.save();
        // New type saved redirect to new type detail page
        res.redirect(type.url);
      }
    }
  }),
];

// Display type delete form on GET.
exports.typeDeleteGet = asyncHandler(async (req, res, next) => {
  // Get type and all the boats of type
  const [type, boatsInType] = await Promise.all([
    Type.findById(req.params.id).exec(),
    Boat.find({ manufacturer: req.params.id }, 'model manufacturer')
      .populate('manufacturer')
      .exec(),
  ]);
  console.log(boatsInType);
  if (type === null) {
    // No results.
    res.redirect('/catalog/types');
  }

  res.render('type_delete', {
    title: 'Delete Type',
    type,
    boatsInType,
  });
});

// Handle type delete on POST.
exports.typeDeletePost = asyncHandler(async (req, res, next) => {
  // Get type and all the boats of type
  const [type, boatsInType] = await Promise.all([
    Type.findById(req.params.id).exec(),
    Boat.find({ manufacturer: req.params.id }, 'model manufacturer type')
      .populate('manufacturer type')
      .exec(),
  ]);

  if (boatsInType.length > 0) {
    // Type has boat, render same as GET
    res.render('type_delete', {
      title: 'Delete Type',
      type,
      boatsInType,
    });
    return;
  }

  // Type has no boat, delete and redirect to types
  await Type.findByIdAndRemove(req.body.typeId);
  res.redirect('/catalog/types');
});

// Display type update form on GET.
exports.typeUpdateGet = asyncHandler(async (req, res, next) => {
  res.send('NOT IMPLEMENTED: type update GET');
});

// Handle type update on POST.
exports.typeUpdatePost = asyncHandler(async (req, res, next) => {
  res.send('NOT IMPLEMENTED: type update POST');
});
