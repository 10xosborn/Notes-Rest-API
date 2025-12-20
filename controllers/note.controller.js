const Joi = require("joi");
const noteModel = require("../models/note.model");

// Create note
const postNote = async (req, res, next) => {
    const noteSchema = Joi.object({
        title : Joi.string().required().min(5).trim(),

        content : Joi.string().required().min(10).max(250),

        category : Joi.string().optional(),

        tags : Joi.string().optional(),
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

        return res.status(200).json({message : "Note created successfuly", data: newNote});

    } catch (error) {
        next (error);
    }
};

// Get all notes
const getAllNote = async (req, res, next) => {
    const {limit = 10, page = 1} = req.query;
    const skip = (page -1) * limit;
    try {
        const allNote = await noteModel.find()
            .sort({ createdAt: -1 })
            .limit(Number(limit))
            .skip(Number(skip));

        return res.status(200).json({
            message: "Notes fetched",
            data: allNote,
        })

    } catch (error) {
        next (error);
    }
};

// Get single note
const getNoteById = async (req, res, next) => {
    try {
        const singleNote = await noteModel.findById(req.params.id);
        if (!singleNote) {
            return res.status(404).json({message : `Note ID : ${req.params.id} cannot be found`});
        };

        return res.status(200).json({message : "A note is fetched", data: singleNote});

    } catch (error) {
        next (error);
    }
};

const getSearchNote = async (req, res, next) => {
    const {search} = req.query

    try {
        const searchNote = await noteModel.find({ $text: { $search: search } });

        return res.status(200).json({
            message: "Notes fetched",
            data: searchNote,
        })
    } catch (error) {
        next(error);
    }
};

// Update note
const updateNoteById = async (req, res, next) => {
    const {error,value} = Joi.object({
        title : Joi.string().required().min(5).trim(),
        content : Joi.string().required().min(10).max(250),
        category : Joi.string().optional(),
        tags : Joi.string().optional(),
    }).validate(req.body);

    if (error) return res.status(400).json({ message: error.message });
    try {
        const updateNote = await noteModel.findByIdAndUpdate(
            req.params.id,
            { ...value }, 
            { 
                new: true, 
                runValidators: true,
            }
        );
        if (updateNote) {
            return res.status(200).json({message : "Note has been updated", data : updateNote});
        };

    } catch (error) {
        next (error);
    }
};

const deletetNoteById = async (req, res, next) => {
    try {
        const deleteNote = await noteModel.findOneAndDelete({
            _id: req.params._id,
            author: req.user.id,
        });
        if (!deleteNote) {
            return res.status(404).json({message : "Note cannot be deleted"});
        };
        return res.status(200).json({message : "You have successfully deleted the note"});

    } catch (error) {
        next (error);
    }
};

module.exports = {
    postNote,
    getAllNote,
    getNoteById,
    getSearchNote,
    updateNoteById,
    deletetNoteById,
};