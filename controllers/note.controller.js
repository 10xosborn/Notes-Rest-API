const Joi = require("joi");
const noteModel = require("../models/note.model");

// Create note
const postNote = async (req, res, next) => {
    const noteSchema = Joi.object({
        title : {
            type : Joi.string()
            .required()
            .minLength(5)
            .index()
            .trim(),
        },

        content : {
            type : Joi.string()
            .required()
            .minLength(10)
            .maxLength(250)
            .index(),
        },

        category : {
            type : Joi.string()
            .optional()
            .enum()
            .default(),
        },

        tags : {
            type : Joi.string()
            .optional()
            .default(),
        },
    });

     const { error, value } = noteSchema.validate(req.body);
    if (error) {
        return res.status(400).json({ message: error.message });
    };
    
    try {
        const newNote = await noteModel.create(value);
        if (!newNote) {
            return res.status(404).json({message : "Note cannot be created", error : error.message});
        };

        if (newNote) {
            return res.status(200).json({message : "Note created successfuly"});
            Data : newNote;
        };

    } catch (error) {
        next (error);
    }
};

// Get all notes
const getAllNote = async (req, res, next) => {
    const {limit = 10, page = 1} = req.query;
    const skip = (page -1) * limit;
    try {
        const allNote = await noteModel.find({})
        .sort({ createdAt: -1 })
            .limit(Number(limit))
            .skip(Number(skip));
            
        if (!allNote) {
            return res.status(404).json({message : "Note cannot be found", error : error.message});
        };

        if (allNote) {
            return res.status(200).json({message : "Notes are feteched"});
            Data : allNote;
        };

    } catch (error) {
        next (error);
    }
};

// Get single note
const getNoteById = async (req, res, next) => {
    try {
        const singleNote = await noteModel.findById(req.params.id);
        if (!singleNote) {
            return res.status(404).json({message : `Note ID : ${req.params.id} cannot be found`, error : error.message});
        };

        if (singleNote) {
            return res.satatus(200).json({message : "A note is feteched"});
            Data : singleNote;
        };

    } catch (error) {
        next (error);
    }
};

// Update note
const updateNoteById = async (req, res, next) => {
    const {error,value} = Joi.object({
        title : {
            type : Joi.string()
            .required()
            .minLength(5)
            .index()
            .trim(),
        },

        content : {
            type : Joi.string()
            .required()
            .minLength(10)
            .maxLength(250)
            .index(),
        },

        category : {
            type : Joi.string()
            .optional()
            .enum()
            .default(),
        },

        tags : {
            type : Joi.string()
            .optional()
            .default(),
        },
    }).validate(req.body);

    if (error) return res.status(400).json({ message: error.message });
    try {
        const updateNote = await noteModel.findByIdAndUpdate(req.params.id);
        if (updateNote) {
            return res.status(200).json({message : "Note has been updateNoted"});
            Data : updateNote;
        };

    } catch (error) {
        next (error);
    }
};
const deletetNoteById = async (req, res, next) => {
    try {
        const deleteNote = await noteModel.findByIdAndDelete(req.params.id);
         if (!deleteNote) {
            return res.status(404).json({message : "You cannot delete note", error : error.message});
        };
        if (deleteNote) {
            return res.status(200).json({message : "You have successfully deleted a note"});
        };

    } catch (error) {
        next (error);
    }
};

module.exports = {
    postNote,
    getAllNote,
    getNoteById,
    updateNoteById,
    deletetNoteById,
};