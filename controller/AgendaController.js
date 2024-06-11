import mongoosePagination from 'mongoose-paginate-v2';


// importar modelo
import Agenda from '../models/agenda.js';
import User from '../models/user.js';

//end-point

export const crearAgenda = async (req, res) => {
    try {
        const params = req.body;

        // Obtener el userId del usuario autenticado desde el token
        const userId = req.user.id;

        // Buscar el usuario en la base de datos y obtener la organización
        const usuario = await User.findById(userId);
        if (!usuario) {
            return res.status(404).json({
                status: "error",
                message: "Usuario no encontrado"
            });
        }
        const organizacion = usuario.organizacion;

        // Validar los datos enviados en el cuerpo de la solicitud
        const requiredFields = ['nombre', 'apellido', 'descripcion', 'fecha_atencion', 'hora_inicial', 'hora_final'];
        for (const field of requiredFields) {
            if (!params[field]) {
                return res.status(400).json({
                    status: "error",
                    message: `Falta el campo '${field}' en la solicitud`
                });
            }
        }

        // Verificar si el nombre ya tiene una hora asignada para el usuario actual
        const agendaExistente = await Agenda.findOne({ nombre: params.nombre, hora_inicial: params.hora_inicial, fecha_atencion: params.fecha_atencion, userId: userId });
        if (agendaExistente) {
            return res.status(409).json({
                status: "error",
                message: "El nombre ya tiene una hora asignada para este usuario"
            });
        }


        // Crear una nueva agenda asociada al usuario actual
        const nuevaAgenda = await Agenda.create({
            nombre: params.nombre,
            apellido: params.apellido,
            descripcion: params.descripcion,
            hora_inicial: params.hora_inicial,
            hora_final: params.hora_final,
            fecha_atencion: params.fecha_atencion,
            userId: userId,
            organizacion: organizacion // Guardar la organización en la agenda
        });

        return res.status(201).json({
            status: "success",
            message: "Agenda creada correctamente",
            agenda: nuevaAgenda
        });

    } catch (error) {
        return res.status(500).json({
            status: "error",
            message: "Error al crear la agenda",
            error: error.message
        });
    }
};

export const borrarAgenda = async (req, res) => {
    try {
        const agendaId = req.params.id;
        const userId = req.user.id;
        // Buscar el artículo y verificar si el usuario logueado es el creador
        const agendaEliminar = await Agenda.findOne({ _id: agendaId, userId: userId });

        if (!agendaEliminar) {
            return res.status(404).json({
                status: 'error',
                message: 'Agenda no encontrada o no tiene permisos para eliminarlo'
            });
        }

        await Agenda.findByIdAndDelete(agendaId);

        return res.status(200).json({
            status: 'success',
            message: 'Agenda eliminada correctamente',
            Horario_eliminado: agendaEliminar
        });

    } catch (error) {
        return res.status(500).json({
            status: 'error',
            message: 'Error al eliminar el artículo',
            error: error.message
        });

    }

}

export const updateAgenda = async (req, res) => {
    try {
        const userId = req.user.id;
        const idAgenda = req.params.id;  // Asumiendo que el id se encuentra en los parámetros
        const agendaActualizada = req.body;

        // Verificar si el artículo existe
        const agendaExistente = await Agenda.findById(idAgenda);

        if (!agendaExistente) {
            return res.status(404).json({
                status: 'error',
                message: 'Agenda no fue encontrada'
            });
        }

        // Verificar si el usuario logueado es el creador del artículo
        if (agendaExistente.userId.toString() !== userId) {
            return res.status(403).json({
                status: 'error',
                message: 'No tiene permisos para modificar esta agenda'
            });
        }

        // Actualizar el artículo con los datos proporcionados
        await Agenda.findByIdAndUpdate(idAgenda, agendaActualizada, { new: true });

        return res.status(200).json({
            status: 'success',
            message: 'Agenda actualizada correctamente',
            agendaExistente,
            agendaActualizada
        });

    } catch (error) {
        return res.status(500).json({
            status: 'error',
            message: 'Error al actualizar la agenda',
            error: error.message
        });
    }

}

export const listAgenda = async (req, res) => {
    try {
        // Obtener el ID del usuario autenticado desde el token
        const userId = req.user.id;

        // Buscar el usuario en la base de datos y obtener la organización
        const usuario = await User.findById(userId);
        if (!usuario) {
            return res.status(404).json({
                status: "error",
                message: "Usuario no encontrado"
            });
        }
        const organizacion = usuario.organizacion;

        // Obtener todos los documentos de la colección Agenda para la organización del usuario
        const horarios = await Agenda.find({ organizacion: organizacion });

        // Verificar si no se encontraron horarios para la organización
        if (!horarios || horarios.length === 0) {
            return res.status(404).json({
                status: "error",
                message: "No se han encontrado horarios para esta organización"
            });
        }

        // Formatear la fecha de atención a YYYY-MM-DD antes de devolver los horarios
        const formattedHorarios = horarios.map(horario => {
            const fechaAtencion = new Date(horario.fecha_atencion);
            const formattedFechaAtencion = fechaAtencion.toISOString().split('T')[0];

            return {
                ...horario._doc,
                fecha_atencion: formattedFechaAtencion
            };
        });

        // Devolver los horarios encontrados para la organización del usuario
        return res.status(200).json({
            status: "success",
            message: "Horarios encontrados",
            organization: organizacion,
            horarios: formattedHorarios
        });

    } catch (error) {
        // Manejar errores
        return res.status(500).json({
            status: 'error',
            message: 'Error al listar los horarios',
            error: error.message,
        });
    }
};



