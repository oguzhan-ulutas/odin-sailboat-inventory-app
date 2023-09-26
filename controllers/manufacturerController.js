const asyncHandler = require('express-async-handler');
const Manufacturer = require('../models/manufacturer');

// Display list of all the manufacturers
exports.manufacturerList = asyncHandler(async (req, res, next) => {
  res.send('NOT IMPLEMENTED: Manufacturer List');
});

// Display detail page for a specific manufacturer
exports.manufacturerDetail = asyncHandler(async (req, res, next) => {
  res.send(`NOT IMPLEMENTED: Manufacturer Detail: ${req.params.id}`);
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
