import multer from "multer"
import express from "express"
import path from "path"
import {
    createProduk,
    getAllProduk,
    getProdukById,
    updateProdukById,
    deleteProdukById
} from "../controllers/produkController.js"
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads')
    },
    filename: function (req, file, cb) {
        const ext = path.extname(file.originalname)
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
        cb(null, file.fieldname + '-' + uniqueSuffix + ext)
    }
})
const upload = multer({ storage: storage })
const router = express.Router()
router.post('/create', upload.single('image'), createProduk)
router.get('/view', getAllProduk)
router.get('/detail/:id', getProdukById)
router.patch('/update/:id', upload.single('image'), updateProdukById)
router.delete('/delete/:id', deleteProdukById)
export default router
