const { getDevices, getDevice, UsbScanner } = require('usb-barcode-scanner');
const config = require('../config')
module.exports = {
    devices: () => {
        return getDevices()
    },

    device: () => {
        let product = config.scanner.productId
        let vendor = config.scanner.vendorId
        return getDevice(Number(vendor), Number(product));
    },

    scanner: () => {
        console.log(this.devices)
        let scanner = new UsbScanner({
            vendorId: config.scanner.vendorId,
            productId: config.scanner.productId
        });

        return scanner
    }
}



