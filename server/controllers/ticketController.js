const User = require("../models/userModel");
const Ticket = require("../models/ticketModel");

/**
 * @desc Get user tickets
 * @route GET /api/tickets
 * @access Private
 */

const getTickets = (req, res, next) => {
  // Get user using the id in the JWT
  User.findById(req.user.id)
    .then((user) => {
      if (!user) {
        res.status(401);
        throw new Error("User not found");
      }

      Ticket.find({ user: req.user.id })
        .then((tickets) => {
          res.status(200).json(tickets);
        })
        .catch(next);
    })
    .catch(next);
};

/**
 * @desc Get user **single** ticket
 * @route GET /api/tickets/:id
 * @access Private
 */

const getSingleTicket = (req, res, next) => {
  // Get user using the id in the JWT
  User.findById(req.user.id)
    .then((user) => {
      if (!user) {
        res.status(401);
        throw new Error("User not found");
      }

      Ticket.findById(req.params.id)
        .then((ticket) => {
          if (!ticket) {
            res.status(404);
            throw new Error("Ticket not found");
          }

          // Cnly user should be able to view ticket. Check if user owns the ticket
          if (ticket.user.toString() !== req.user.id) {
            res.status(401);
            throw new Error("Not authorized");
          }

          res.status(200).json(ticket);
        })
        .catch(next);
    })
    .catch(next);
};

/**
 * @desc delete user ticket
 * @route DELETE /api/tickets/:id
 * @access Private
 */

const deleteTicket = (req, res, next) => {
  // Get user using the id in the JWT
  User.findById(req.user.id)
    .then((user) => {
      if (!user) {
        res.status(401);
        throw new Error("User not found");
      }

      Ticket.findById(req.params.id)
        .then((ticket) => {
          if (!ticket) {
            res.status(404);
            throw new Error("Ticket not found");
          }

          // Cnly user should be able to view ticket. Check if user owns the ticket
          if (ticket.user.toString() !== req.user.id) {
            res.status(401);
            throw new Error("Not authorized");
          }

          ticket.remove();
          res.status(200).json({ success: true });
        })
        .catch(next);
    })
    .catch(next);
};

/**
 * @desc Update ticket
 * @route PUT /api/tickets/:id
 * @access Private
 */

const updateTicket = (req, res, next) => {
  // Get user using the id in the JWT
  User.findById(req.user.id)
    .then((user) => {
      if (!user) {
        res.status(401);
        throw new Error("User not found");
      }

      Ticket.findById(req.params.id)
        .then((ticket) => {
          if (!ticket) {
            res.status(404);
            throw new Error("Ticket not found");
          }

          // Cnly user should be able to view ticket. Check if user owns the ticket
          if (ticket.user.toString() !== req.user.id) {
            res.status(401);
            throw new Error("Not authorized");
          }

          // update ticket. if it's not already there create it
          Ticket.findByIdAndUpdate(req.params.id, req.body, { new: true })
            .then((ticket) => res.status(200).json(ticket))
            .catch(next);
        })
        .catch(next);
    })
    .catch(next);
};

/**
 * @desc Create user tickets
 * @route POST /api/tickets
 * @access Private
 */

const createTicket = (req, res, next) => {
  const { product, description } = req.body;

  if (!product || !description) {
    res.status(400);
    throw new Error("Please add a product and description");
  }

  // Get user using the id in the JWT
  User.findById(req.user.id)
    .then((user) => {
      if (!user) {
        res.status(401);
        throw new Error("User not found");
      }

      Ticket.create({
        product,
        description,
        user: req.user.id,
        status: "new",
      })
        .then((ticket) => {
          res.status(201).json(ticket);
        })
        .catch(next);
    })
    .catch(next);
};

module.exports = {
  getTickets,
  getSingleTicket,
  createTicket,
  updateTicket,
  deleteTicket,
};
