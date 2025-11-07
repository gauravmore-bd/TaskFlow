const express = require('express');
const { body } = require('express-validator');
const { protect } = require('../middleware/authMiddleware');
const controller = require('../controllers/taskController');
const router = express.Router();

router.use(protect);

router.post('/', [body('title').notEmpty()], controller.createTask);
router.get('/', controller.getTasks);
router.get('/:id', controller.getTaskById);
router.put('/:id', controller.updateTask);
router.delete('/:id', controller.deleteTask);

module.exports = router;
