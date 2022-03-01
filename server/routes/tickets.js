const express = require("express");
const router = express.Router();
const {
  getTickets,
  createTicket,
  getSingleTicket,
  deleteTicket,
  updateTicket,
} = require("../controllers/ticketController");

const { protect } = require("../middleware/authMiddleware");

// Re-route into note router 
// example route: '/api/tickets/:ticketId/notes
const noteRouter = require('./notes')
router.use('/:ticketId/notes', noteRouter)

router.route("/").get(protect, getTickets).post(protect, createTicket);

router
  .route("/:id")
  .get(protect, getSingleTicket)
  .delete(protect, deleteTicket)
  .put(protect, updateTicket);

module.exports = router;
