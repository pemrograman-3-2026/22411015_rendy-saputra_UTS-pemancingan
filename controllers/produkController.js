import { existsSync, unlinkSync } from "fs"
import { prisma } from "../lib/prisma.js"

const removefilefromstatic = async (filename) => {
    existsSync(`./uploads/${filename}`) && unlinkSync(`./uploads/${filename}`);
}

export const createProduk = async (req, res) => {
    const filename = req.file ? req.file.filename : null
    const body = req.body

    const newProduk = await prisma.produk.create({
        data: {
            nama: body.nama,
            kategori: body.kategori,
            harga: Number(body.harga),
            stok: Number(body.stok),
            image: filename,
            deskripsi: body.deskripsi
        }
    })

    res.json({
        message: 'PRODUK CREATED SUCCESSFULLY'
    })
}

export const updateProdukById = async (req, res) => {
    const body = req.body

    const oldImage = await prisma.produk.findUnique({
        where: {
            id: Number(req.params.id)
        },
        select: {
            image: true
        }
    })

    let data = {
        nama: body.nama,
        kategori: body.kategori,
        harga: Number(body.harga),
        stok: Number(body.stok),
        deskripsi: body.deskripsi
    }

    if(req.file) {
        data = {
            ...data,
            image: req.file.filename
        }
    }

    const updateData = await prisma.produk.update({
        where: {
            id: Number(req.params.id)
        },
        data
    })

    if (req.file && updateData && oldImage.image) {
        await removefilefromstatic(oldImage.image)
    }

    res.json({
        message: 'PRODUK UPDATED SUCCESSFULLY'
    })
}

export const getAllProduk = async (req, res) => {
    const data = await prisma.produk.findMany({
        orderBy: { createdAt: 'desc' }
    })

    res.json({
        message: "Berhasil mengambil semua produk",
        data: data
    })
}

export const getProdukById = async (req, res) => {
    const data = await prisma.produk.findUnique({
        where: { id: Number(req.params.id) }
    })

    res.json({
        message: "Berhasil mengambil detail produk",
        data: data
    })
}

export const deleteProdukById = async (req, res) => {
    const id = Number(req.params.id)
    
    const existing = await prisma.produk.findUnique({
        where: { id: id },
        select: { image: true }
    })

    await prisma.produk.delete({
        where: { id: id }
    })

    if (existing && existing.image) {
        await removefilefromstatic(existing.image)
    }

    res.json({
        message: "PRODUK DELETED SUCCESSFULLY"
    })
}
