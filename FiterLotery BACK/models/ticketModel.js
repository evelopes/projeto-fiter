const mongoose = require('mongoose');

const ticketSchema = new mongoose.Schema({
  betId: {
    type: Number,
    required: true
  },
  ticketId: {
    type: Number,
    required: false,
    unique: true
  },
  selectedNumbers: {
    type: [Number],
    required: true,
    validate: {
      validator: function (value) {
        return value.length >= 15 && value.length <= 20;
      },
      message: 'Você só pode selecionar de 15 e 20 números.'
    }
  },
  betValue: {
    type: Number,
    required: true
  },
  date: {
    type: Date,
    required: true
  }
});

ticketSchema.index({ ticketId: 1 }, { unique: true });

ticketSchema.virtual('selectedNumbersCount').get(function() {
  return this.selectedNumbers.length;
});

ticketSchema.pre('validate', function (next) {
  if (this.selectedNumbersCount === 15) {
    this.betValue = 3;
  } else if (this.selectedNumbersCount === 16) {
    this.betValue = 100;
  } else if (this.selectedNumbersCount === 17) {
    this.betValue = 300;
  } else if (this.selectedNumbersCount === 18) {
    this.betValue = 5000;
  } else if (this.selectedNumbersCount === 19) {
    this.betValue = 15000;
  } else if (this.selectedNumbersCount === 20) {
    this.betValue = 25000;
  } else {
    return next(new Error('Valor inválido para selectedNumbersCount'));
  }
  next();
});

const Ticket = mongoose.model('Ticket', ticketSchema);

module.exports = Ticket;
