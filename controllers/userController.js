import bcrypt from 'bcrypt'
import { prisma } from '../lib/prisma.js'

export const registerUser = async (req, res) => {
    const body = req.body
    const password = body.password
    const hashPassword = bcrypt.hashSync(password, 10)
    
    const isUsernameExist = await prisma.user.findUnique({
        where: {
            username: body.username
        }
    })

    if (isUsernameExist) {
        return res.status(400).json({
            message: 'Username sudah terdaftar'
        })
    }

    await prisma.user.create({
        data: {
            username: body.username,
            password: hashPassword,
            role: body.role,
            noTelp: body.noTelp
        }
    })

    res.json({
        message: 'Registrasi berhasil'
    })
}

export const loginUser = async (req, res) => {
    const body = req.body
    const username = body.username
    const password = body.password

    const isUsernameExist = await prisma.user.findUnique({
        where: {
            username: username
        }
    })

    if (!isUsernameExist) {
        return res.status(404).json({
            message: 'Username tidak ditemukan'
        })
    }

    const hashPassword = isUsernameExist.password

    if (!bcrypt.compareSync(password, hashPassword)) {
        return res.status(401).json({
            message: 'Password salah'
        })
    }
    
    const dataSession = JSON.stringify({
        id: isUsernameExist.id,
        username,
        role: isUsernameExist.role,
        noTelp: isUsernameExist.noTelp
    })

    res.cookie('user', dataSession, {
        httpOnly: false,
        secure: false,
        sameSite: 'lax',
        path: '/',
        maxAge: 1000 * 60 * 60 * 24 * 7
    })

    res.json({
        message: 'Login berhasil',
        data: {
            id: isUsernameExist.id,
            username: isUsernameExist.username,
            role: isUsernameExist.role,
            noTelp: isUsernameExist.noTelp
        }
    })
}
