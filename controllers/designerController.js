const asyncHandler = require('express-async-handler');
const Designer = require('../models/designer');

// Display list of all the designer
exports.designerList = asyncHandler(async (req, res, next) => {
  res.send('NOT IMPLEMENTED: Designer List');
});

// Display detail page for a specific designer
exports.designerDetail = asyncHandler(async (req, res, next) => {
  res.send(`NOT IMPLEMENTED: Designer Detail: ${req.params.id}`);
});

// Display designer create form on GET
exports.designerCreateGet = asyncHandler(async (req, res, next) => {
  res.send('NOT IMPLEMENTED: Designer Create GET');
});

// Handle designer create on POST.
exports.designerCreatePost = asyncHandler(async (req, res, next) => {
  res.send('NOT IMPLEMENTED: designer create POST');
});

// Display designer delete form on GET.
exports.designerDeleteGet = asyncHandler(async (req, res, next) => {
  res.send('NOT IMPLEMENTED: Designer delete GET');
});

// Handle designer delete on POST.
exports.designerDeletePost = asyncHandler(async (req, res, next) => {
  res.send('NOT IMPLEMENTED: Designer delete POST');
});

// Display designer update form on GET.
exports.designerUpdateGet = asyncHandler(async (req, res, next) => {
  res.send('NOT IMPLEMENTED: Designer update GET');
});

// Handle designer update on POST.
exports.designerUpdatePost = asyncHandler(async (req, res, next) => {
  res.send('NOT IMPLEMENTED: designer update POST');
});
