const User = require("../models/userModel");
const Ticket = require("../models/ticketModel");
const Note = require("../models/noteModel");

/**
 * @desc Get notes for a ticket
 * @route GET /api/tickets/:ticketId/notes
 * @access Private
 */

const getNotes = (req, res, next) => {
  // Get user using the id in the JWT
  User.findById(req.user.id)
    .then((user) => {
      if (!user) {
        res.status(401);
        throw new Error("User not found");
      }

      Ticket.findById(req.params.ticketId)
        .then((ticket) => {
          // if not same as user in the token
          if (ticket.user.toString() !== req.user.id) {
            res.status(401);
            throw new Error("User not authorized");
          }

          Note.find({ ticket: req.params.ticketId }).then((notes) => {
            res.status(200).json(notes);
          });
        })
        .catch(next);
    })
    .catch(next);
};

/**
 * @desc Create ticket note
 * @route POST /api/tickets/:ticketId/notes
 * @access Private
 */

const createNote = (req, res, next) => {
  const { text } = req.body;

  if (!text) {
    res.status(400);
    throw new Error("Please add a note");
  }

  // Get user using the id in the JWT
  User.findById(req.user.id)
    .then((user) => {
      if (!user) {
        res.status(401);
        throw new Error("User not found");
      }

      Ticket.findById(req.params.ticketId)
        .then((ticket) => {
          // if not same as user in the token
          if (ticket.user.toString() !== req.user.id) {
            res.status(401);
            throw new Error("User not authorized");
          }

          Note.create({
            user: req.user.id,
            isStaff: false,
            ticket: req.params.ticketId,
            text,
          })
            .then((note) => {
              res.status(201).json(note);
            })
            .catch(next);
        })
        .catch(next);
    })
    .catch(next);
};

module.exports = {
  getNotes,
  createNote,
};
