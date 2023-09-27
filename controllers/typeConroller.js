const asyncHandler = require('express-async-handler');
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
exports.typeCreateGet = asyncHandler(async (req, res, next) => {
  res.send('NOT IMPLEMENTED: Type Create GET');
});

// Handle type create on POST.
exports.typeCreatePost = asyncHandler(async (req, res, next) => {
  res.send('NOT IMPLEMENTED: type create POST');
});

// Display type delete form on GET.
exports.typeDeleteGet = asyncHandler(async (req, res, next) => {
  res.send('NOT IMPLEMENTED: Type delete GET');
});

// Handle type delete on POST.
exports.typeDeletePost = asyncHandler(async (req, res, next) => {
  res.send('NOT IMPLEMENTED: type delete POST');
});

// Display type update form on GET.
exports.typeUpdateGet = asyncHandler(async (req, res, next) => {
  res.send('NOT IMPLEMENTED: type update GET');
});

// Handle type update on POST.
exports.typeUpdatePost = asyncHandler(async (req, res, next) => {
  res.send('NOT IMPLEMENTED: type update POST');
});
