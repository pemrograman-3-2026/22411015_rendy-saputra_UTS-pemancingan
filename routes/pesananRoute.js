import express from "express"
import { createPesanan, getAllPesanan, getPesananById, updatePesananById, deleteAllPesanan, deletePesananById } from "../controllers/pesananController.js"
const router = express.Router()
router.post("/create", createPesanan)
router.get("/view", getAllPesanan)
router.get("/detail/:id", getPesananById)
router.put("/update/:id", updatePesananById)
router.delete("/delete-all", deleteAllPesanan)
router.delete("/delete/:id", deletePesananById)
export default router
