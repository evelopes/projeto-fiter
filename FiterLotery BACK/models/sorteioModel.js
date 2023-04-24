const mongoose = require('mongoose')

const sorteioSchema = new mongoose.Schema({
  betId: {
    type: Number,
    required: false,
    unique: true
  },
  winningNumbers: {
    type: [Number],
    required: true,
    default: [],
    validate: {
      validator: function (v) {
        return v.length === 15;
      },
      message: 'O array de winningNumbers deve ter exatamente 15 elementos'
    }
  },
  date: {
    type: Date,
    required: true
  }
});

sorteioSchema.index({ betId: 1 }, { unique: true });

const Sorteio = mongoose.model('Sorteio', sorteioSchema);

module.exports = Sorteio;