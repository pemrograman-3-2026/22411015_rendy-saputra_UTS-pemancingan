import express from 'express'
import UserRoute from './routes/userRoute.js'
import PesananRoute from './routes/pesananRoute.js'
import ProdukRoute from './routes/produkRoute.js'
import cors from 'cors'
import path from 'path'
const app = express()
app.use(express.json())
app.use(cors({
  origin: 'http://localhost:3001',
  credentials: true,
}))
const imagepath = express.static(path.join(process.cwd(), 'uploads'))
app.use('/image', imagepath)
app.get('/', (req, res) => {
  res.send('UTS - Sistem Manajemen Toko Pemancingan')
})
app.use('/user', UserRoute)
app.use('/pesanan', PesananRoute)
app.use('/produk', ProdukRoute)
app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000')
})
