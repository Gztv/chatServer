const {Schema, model} = require('mongoose');

const MessageSchema = Schema(
    {
        from: {
            type: String,
            required: true
        },
        to: {
            type: String,
            required: true
        },
        msg: {
            type: String,
            required: true
        }

    },
    {
        timestamps: true
    }
);
MessageSchema.method('toJSON', function(){
    const {__v,_id, ...object} = this.toObject();
    return object 
});

module.exports = model('Message', MessageSchema);