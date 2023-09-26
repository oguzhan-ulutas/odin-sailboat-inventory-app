const asyncHandler = require('express-async-handler');
const Boat = require('../models/boat');

// Display list of all the boats
exports.boatList = asyncHandler(async (req, res, next) => {
  res.send('NOT IMPLEMENTED: Boat List');
});

// Display detail page for a specific boat
exports.boatDetail = asyncHandler(async (req, res, next) => {
  res.send('NOT IMPLEMENTED: Boat List');
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
  res.send('NOT IMPLEMENTED: Author update POST');
});
