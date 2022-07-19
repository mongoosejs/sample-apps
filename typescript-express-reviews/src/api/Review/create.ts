import express from 'express';

const router = express.Router();

router.post('/review/create', (req, res) => {
    console.log('The create review route');
});

export default router;