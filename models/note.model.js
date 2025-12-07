const { optional } = require('joi')
const mongoose = require('mongoose')

const notesSchema = new mongoose.Schema ({
  title:{
    type: String,
    required: true,
    minLength: 5,
    index: true,
    trim: true
  },
  content:{
    type: String,
    required: true,
    minLength: 10,
    maxLength: 250,
    index: true
  },
  category:{
    type: String,
    optional,
    enum: ["Work", "Personal", "Other"],
    default: "Other"
  },
  tags:{
    type: String,
    optional,
    default: {}
  }
},
{
  timestamps: true
}
);

notesSchema.index({ title: 'text', content: 'text', category: 'text', tags: 'text' });

const notes = mongoose.model("note", notesSchema);

module.exports = notes;