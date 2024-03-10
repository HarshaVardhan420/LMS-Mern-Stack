const mongoose = require('mongoose');

const authors = new mongoose.Schema({
    name: {
        type: 'string',
    },
    email: {
        type: 'string',
    },
},{
    timestamps: true,
});

const author = mongoose.model('Author', authors);
module.exports = author;

// export default mongoose.model.Authors || mongoose.model('Book', authors);
