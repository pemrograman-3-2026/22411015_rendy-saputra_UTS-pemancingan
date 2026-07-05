import { prisma } from "../lib/prisma.js"

export const createPesanan = async (req, res) => {
    const body = req.body

    const totalHarga = Number(body.hargaSatuan) * Number(body.jumlah)

    const newPesanan = await prisma.pesanan.create({
        data: {
            userId: Number(body.userId),
            namaProduk: body.namaProduk,
            kategori: body.kategori,
            hargaSatuan: Number(body.hargaSatuan),
            jumlah: Number(body.jumlah),
            totalHarga: totalHarga,
            catatan: body.catatan
        }
    })

    res.json({
        message: 'PESANAN CREATED SUCCESSFULLY'
    })
}

export const updatePesananById = async (req, res) => {
    const body = req.body
    
    const totalHarga = Number(body.hargaSatuan) * Number(body.jumlah)

    let data = {
        namaProduk: body.namaProduk,
        kategori: body.kategori,
        hargaSatuan: Number(body.hargaSatuan),
        jumlah: Number(body.jumlah),
        totalHarga: totalHarga,
        catatan: body.catatan
    }

    const updateData = await prisma.pesanan.update({
        where: {
            id: Number(req.params.id)
        },
        data
    })

    res.json({
        message: 'PESANAN UPDATED SUCCESSFULLY'
    })
}

export const getAllPesanan = async (req, res) => {
    const data = await prisma.pesanan.findMany({
        include: {
            user: {
                select: { username: true }
            }
        },
        orderBy: { createdAt: 'desc' }
    })

    res.json({
        message: "Berhasil mengambil semua pesanan",
        data: data
    })
}

export const getPesananById = async (req, res) => {
    const data = await prisma.pesanan.findUnique({
        where: { id: Number(req.params.id) },
        include: {
            user: {
                select: { username: true }
            }
        }
    })

    res.json({
        message: "Berhasil mengambil detail pesanan",
        data: data
    })
}

export const deleteAllPesanan = async (req, res) => {
    await prisma.pesanan.deleteMany({})

    res.json({
        message: "ALL PESANAN DELETED SUCCESSFULLY"
    })
}

export const deletePesananById = async (req, res) => {
    await prisma.pesanan.delete({
        where: { id: Number(req.params.id) }
    })

    res.json({
        message: "PESANAN DELETED SUCCESSFULLY"
    })
}
