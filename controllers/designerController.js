const asyncHandler = require('express-async-handler');
const Designer = require('../models/designer');
const Boat = require('../models/boat');

// Display list of all the designer
exports.designerList = asyncHandler(async (req, res, next) => {
  const allDesigners = await Designer.find().exec();

  res.render('designer_list', { title: 'Designers', allDesigners });
});

// Display detail page for a specific designer
exports.designerDetail = asyncHandler(async (req, res, next) => {
  const [designer, boatsDesigned] = await Promise.all([
    Designer.findById(req.params.id).exec(),
    Boat.find({ designer: req.params.id }, 'model manufacturer').populate('manufacturer').exec(),
  ]);

  if (designer === null) {
    // No designer
    const err = new Error('Designer could not found.');
    err.status = 404;
    return next(err);
  }

  res.render('designer_detail', {
    title: 'Designer Details',
    designer,
    boatsDesigned,
  });
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
