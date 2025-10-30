const router = require('express').Router();
const BrandRouter = require('./BrandRouter');
const CategoryRouter = require('./CategoryRouter');


router.use("/brand",BrandRouter);
router.use("/category",CategoryRouter);



module.exports = router;