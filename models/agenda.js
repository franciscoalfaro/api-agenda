import mongoose from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2';

const { Schema, model } = mongoose;

const AgendaSchema = new Schema({
    user: {
        type: Schema.ObjectId,
        ref: "User"
    },
    nombre: {
        type: String,
        required: true
    },
    apellido: {
        type: String
    },
    email: {
        type: String
    },
    descripcion: {
        type: String
    },
    fecha_atencion: {
        type: Date,
        default: Date.now,
        required: true
    },
    create_at: {
        type: Date,
        default: Date.now
    }
});

AgendaSchema.plugin(mongoosePaginate);

const Agenda = model("Agenda", AgendaSchema, "agenda");

export default Agenda;
