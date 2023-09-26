const express = require('express');

const router = express.Router();

// Require controllers
const boatController = require('../controllers/boatController');
const designerController = require('../controllers/designerController');
const manufacturerController = require('../controllers/manufacturerController');
const typeController = require('../controllers/typeConroller');

// BOAT ROUTES

// Get catolog home page
router.get('/', boatController.index);

// Get request for creating a boat
router.get('/boat/create', boatController.boatCreateGet);

// Post request for creating a boat
router.post('/boat/create', boatController.boatCreatePost);

// Get req. for deleting a boat
router.get('/boat/:id/delete', boatController.boatDeleteGet);

// post req. for deleting a boat
router.post('/boat/:id/delete', boatController.boatDeletePost);

// Get req. for update a boat
router.get('/boat/:id/update', boatController.boatUpdateGet);

// Post req. for update a boat
router.post('/boat/:id/update', boatController.boatUpdatePost);

// Get req. for a book
router.get('/boat/:id', boatController.boatDetail);

// Get req. for list of all the boats
router.get('/boats', boatController.boatList);

// DESIGNER ROUTES

// Get request for creating a designer
router.get('/designer/create', designerController.designerCreateGet);

// Post request for creating a designer
router.post('/designer/create', designerController.designerCreatePost);

// Get req. for deleting a designer
router.get('/designer/:id/delete', designerController.designerDeleteGet);

// post req. for deleting a designer
router.post('/designer/:id/delete', designerController.designerDeletePost);

// Get req. for update a designer
router.get('/designer/:id/update', designerController.designerUpdateGet);

// Post req. for update a designer
router.post('/designer/:id/update', designerController.designerUpdatePost);

// Get req. for a designer
router.get('/designer/:id', designerController.designerDetail);

// Get req. for list of all the designer
router.get('/designers', designerController.designerList);

// MANUFACTURER ROUTES

// Get request for creating a manufacturer
router.get('/manufacturer/create', manufacturerController.manufacturerCreateGet);

// Post request for creating a manufacturer
router.post('/manufacturer/create', manufacturerController.manufacturerCreatePost);

// Get req. for deleting a manufacturer
router.get('/manufacturer/:id/delete', manufacturerController.manufacturerDeleteGet);

// post req. for deleting a manufacturer
router.post('/manufacturer/:id/delete', manufacturerController.manufacturerDeletePost);

// Get req. for update a manufacturer
router.get('/manufacturer/:id/update', manufacturerController.manufacturerUpdateGet);

// Post req. for update a manufacturer
router.post('/manufacturer/:id/update', manufacturerController.manufacturerUpdatePost);

// Get req. for a manufacturer
router.get('/manufacturer/:id', manufacturerController.manufacturerDetail);

// Get req. for list of all the manufacturer
router.get('/manufacturers', manufacturerController.manufacturerList);

// TYPE ROUTES

// Get request for creating a type
router.get('/type/create', typeController.typeCreateGet);

// Post request for creating a type
router.post('/type/create', typeController.typeCreatePost);

// Get req. for deleting a type
router.get('/type/:id/delete', typeController.typeDeleteGet);

// post req. for deleting a type
router.post('/type/:id/delete', typeController.typeDeletePost);

// Get req. for update a type
router.get('/type/:id/update', typeController.typeUpdateGet);

// Post req. for update a type
router.post('/type/:id/update', typeController.typeUpdatePost);

// Get req. for a type
router.get('/type/:id', typeController.typeDetail);

// Get req. for list of all the type
router.get('/types', typeController.typeList);

module.exports = router;
