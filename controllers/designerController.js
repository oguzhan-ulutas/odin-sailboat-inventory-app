const asyncHandler = require('express-async-handler');
const { body, validationResult } = require('express-validator');

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
  res.render('designer_form', { title: 'Create Designer' });
});

// Handle designer create on POST.
exports.designerCreatePost = [
  // Validate and sanitize form data
  body('first_name')
    .trim()
    .isLength({ min: 1 })
    .escape()
    .withMessage('First name must be specified.')
    .isAlphanumeric()
    .withMessage('First name has non-alphanumeric characters.'),
  body('last_name')
    .trim()
    .isLength({ min: 1 })
    .escape()
    .withMessage('Family name must be specified.')
    .isAlphanumeric()
    .withMessage('Family name has non-alphanumeric characters.'),

  asyncHandler(async (req, res, next) => {
    // Extract the validation errors from a request.
    const errors = validationResult(req);

    // Create Designer object with escaped and trimmed data
    const designer = new Designer({
      first_name: req.body.first_name,
      last_name: req.body.last_name,
    });

    if (!errors.isEmpty()) {
      // There is errors redirect to designer create form
      res.render('designer_form', {
        title: 'Create Designer',
        designer,
        errors: errors.array(),
      });
    } else {
      // Data is valid

      // Check if designer exist in database
      const designerExist = await Designer.findOne({
        first_name: designer.first_name,
        last_name: designer.last_name,
      }).exec();
      if (designerExist) {
        // Designer exist redirect to designer detail page
        res.redirect(designerExist.url);
      } else {
        // Save manufacturer
        await designer.save();
        // Redirect to new designer page
        res.redirect(designer.url);
      }
    }
  }),
];

// Display designer delete form on GET.
exports.designerDeleteGet = asyncHandler(async (req, res, next) => {
  // Get designer and all the boats s/he design
  const [designer, boatDesigned] = await Promise.all([
    Designer.findById(req.params.id).exec(),
    Boat.find({ designer: req.params.id }, 'model manufacturer').populate('manufacturer').exec(),
  ]);

  if (designer === null) {
    // No results.
    res.redirect('/catalog/designers');
  }

  res.render('designer_delete', {
    title: 'Delete Designer',
    designer,
    boatDesigned,
  });
});

// Handle designer delete on POST.
exports.designerDeletePost = asyncHandler(async (req, res, next) => {
  // Get designer and all the boats s/he design
  const [designer, boatDesigned] = await Promise.all([
    Designer.findById(req.params.id).exec(),
    Boat.find({ designer: req.params.id }, 'model manufacturer').populate('manufacturer').exec(),
  ]);

  if (boatDesigned.length > 0) {
    // designer has boat, render same as GET
    res.render('designer_delete', {
      title: 'Delete Designer',
      designer,
      boatDesigned,
    });
    return;
  }

  // Designer has no boat, delete and redirect to designers
  await Designer.findByIdAndRemove(req.body.designerId);
  res.redirect('/catalog/designers');
});

// Display designer update form on GET.
exports.designerUpdateGet = asyncHandler(async (req, res, next) => {
  res.render('designer_form', { title: 'Update Designer' });
});

// Handle designer update on POST.
exports.designerUpdatePost = [
  // Validate and sanitize form data
  body('first_name')
    .trim()
    .isLength({ min: 1 })
    .escape()
    .withMessage('First name must be specified.')
    .isAlphanumeric()
    .withMessage('First name has non-alphanumeric characters.'),
  body('last_name')
    .trim()
    .isLength({ min: 1 })
    .escape()
    .withMessage('Family name must be specified.')
    .isAlphanumeric()
    .withMessage('Family name has non-alphanumeric characters.'),

  asyncHandler(async (req, res, next) => {
    // Extract the validation errors from a request.
    const errors = validationResult(req);

    // Create Designer object with escaped and trimmed data
    const designer = new Designer({
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      _id: req.params.id,
    });

    if (!errors.isEmpty()) {
      // There is errors redirect to designer create form
      res.render('designer_form', {
        title: 'Update Designer',
        designer,
        errors: errors.array(),
      });
    } else {
      // Data is valid, Update designer
      const updatedDesigner = await Designer.findByIdAndUpdate(req.params.id, designer, {});
      // Redirect to new manufacturer page
      res.redirect(updatedDesigner.url);
    }
  }),
];
