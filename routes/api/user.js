
const router = require("express").Router();
const userCtlr = require ("../../controllers/userController");

// routes
router.post('/authenticate', userCtlr.authenticate);
router.post('/register', userCtlr.register);
router.get('/', userCtlr.getAll);
router.get('/current', userCtlr.getCurrent);
router.get('/:id', userCtlr.getById);
router.put('/:id', userCtlr.update);
router.delete('/:id', userCtlr._delete);

module.exports = router;
