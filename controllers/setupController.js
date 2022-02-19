const router = require("express").Router();
const asyncWrapper = require("../helpers/async").AsyncWrapper;
const DatabaseFunc = require('../helpers/crud')
const Upload = require('../helpers/upload')
const Authenticator = require('../middlewares/auth-middleware')
const crudService = new DatabaseFunc;
const auth = require('../helpers/auth')

const DeviceService = require('../services/deviceService')
const deviceService = new DeviceService;
const AccountService = require('../services/accountService')
const accountService = new AccountService;


router.get("/printer", asyncWrapper(async(req, res)=> {
    let data = await deviceService.printerInfo()
    res.json({message: 'Result', result: data});
}));

router.post("/print", asyncWrapper(async(req, res)=> {
    let data = req.body;
    await deviceService.printReceipt({...data.data})
    res.json({message: 'Result', result: data});
}));


router.get("/barcode", asyncWrapper(async(req, res) => {
    let data = await deviceService.scannersInfo()
    res.json({message: 'Result', result: data});
}));


module.exports = router;