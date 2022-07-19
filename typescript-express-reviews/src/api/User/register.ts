import express from 'express';

const router = express.Router();

router.post('/register', (req, res) => {
    console.log('The register route');
});

export default router;