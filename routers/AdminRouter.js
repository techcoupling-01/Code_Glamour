const router = require('express').Router();

const BrandRouter = require('./BrandRouter');

const CategoryRouter = require('./CategoryRouter');

const StaffRouter = require('./StaffRouter');

const BranchRouter =require('./BranchRouter');

router.use("/brand",BrandRouter);

router.use("/category",CategoryRouter);

router.use("/branch",BranchRouter);

router.use("/staff", StaffRouter);



module.exports = router;