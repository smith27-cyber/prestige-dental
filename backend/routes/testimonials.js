// routes/testimonialRoutes.js
const express = require('express');
const router = express.Router();
const testimonialController = require('../controllers/testimonialController');

// Route to add a testimonial
router.post('/add', testimonialController.addTestimonial);

// Route to get testimonials
router.get('/', testimonialController.getTestimonials);

// Route to delete a testimonial by ID
router.delete('/:id', testimonialController.deleteTestimonial);

module.exports = router;
