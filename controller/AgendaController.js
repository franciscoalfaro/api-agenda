import fs from 'fs';
import bcrypt from 'bcrypt';
import mongoosePagination from 'mongoose-paginate-v2';
import path from 'path';


// importar modelo
import Agenda from '../models/agenda.js';

// importar servicio
import * as validate from '../helpers/validate.js';
import * as jwt from '../services/jwt.js';

//end-point

export const crearAgenda = async (req, res) => {
    try {
        let params = req.body;
        // Obtener el userId del usuario autenticado desde el token
        const userId = req.user.id;

        if (!params.nombre || !params.apellido || !params.descripcion || !params.fecha_atencion || !params.hora) {
            return res.status(400).json({
                status: "Error",
                message: "Faltan datos por enviar"
            });
        }

        // Comprobar si el nombre ya tiene una hora asignada para el usuario actual
        const agendaExistente = await Agenda.findOne({ nombre: params.nombre, hora: params.hora, userId: userId });

        if (agendaExistente) {
            return res.status(409).json({
                status: "error",
                message: "El nombre ya tiene una hora asignada para este usuario"
            });
        }

        // Si el nombre no tiene una hora asignada para el usuario actual, crearla asociada a ese usuario
        const nuevaAgenda = await Agenda.create({
            nombre: params.nombre,
            apellido: params.apellido,
            descripcion: params.descripcion,
            email: params.email,
            hora: params.hora,
            fecha_atencion: params.fecha_atencion,
            userId: userId // Asociar la agenda al usuario logueado
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
        console.log(agendaEliminar)

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

export const listAgenda = async(req, res)=>{
    
}
