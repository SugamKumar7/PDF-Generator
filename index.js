const { createInvoice } = require("./createInvoice.js");

const invoice = {
  buyer: {
    name: "Abijith",
    address: "1234 Main Street",
    city: "Bengaluru",
    state: "Karnataka",
    country: "India",
    postal_code: 560059,
    email: "buyer@gmail.com",
    phoneNo: 8954785478
  },

  seller: {
    name: "Sugam",
    address: "5678 Main Street",
    city: "Bengaluru",
    state: "Karnataka",
    country: "India",
    postal_code: 560001,
    email: "seller@gmail.com",
    phoneNo: 8954785478
  }, 

  product: {
      productName: "CT Scanner",
      model: "47",
      modelYear: 2018,
      serialNumber: 4865,
      subTotal: 60000,
      total: 100000
  },

  invoiceNo: 1234
};

createInvoice(invoice, "invoice.pdf");
