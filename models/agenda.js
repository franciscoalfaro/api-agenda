import mongoose from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2';

const { Schema, model } = mongoose;

const AgendaSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required:true
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
    hora_inicial: {
        type: String,
        required: true
    },
    hora_final: {
        type: String,
        required: true
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
