const mongoose = require('mongoose');

const books = new mongoose.Schema({
    title: {
        type: 'string',
    },
    author_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Author',
    }
},{
    timestamps: true,
});

const book = mongoose.model('Book', books);
module.exports = book;

//  export default mongoose.model.Books || mongoose.model('Book', books);

