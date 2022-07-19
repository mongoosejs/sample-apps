import express from 'express';

const router = express.Router();

router.post('/login', (req, res) => {
    console.log('The login route')
});

export default router;