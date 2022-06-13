import { Router } from 'express'

const router = Router()

// auth APIs
router.use('/auth', auth)

export default router
