const asyncHandler = require('express-async-handler');
const Type = require('../models/type');

// Display list of all the types
exports.typeList = asyncHandler(async (req, res, next) => {
  const allTypes = await Type.find().exec();

  res.render('type_list', { title: 'Boat Type List', allTypes });
});

// Display detail page for a specific type
exports.typeDetail = asyncHandler(async (req, res, next) => {
  res.send(`NOT IMPLEMENTED: Type Detail: ${req.params.id}`);
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
