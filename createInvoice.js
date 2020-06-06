const fs = require("fs");
const PDFDocument = require("pdfkit");

function createInvoice(invoice, path) {
  let doc = new PDFDocument({ size: "A4", margin: 50 });

  generateHeader(doc);
  generateCustomerInformation(doc, invoice);
  generateInvoiceTable(doc, invoice);
  //generateFooter(doc);

  doc.end();
  doc.pipe(fs.createWriteStream(path));
}

function generateHeader(doc) {
  doc
    .image("ge.png", 50, 35, { width: 150 })
    .fillColor("#444444")
    .fontSize(20)
    //.text("ACME Inc.", 110, 57)
    .fontSize(10)
    .text("GE Healthcare", 200, 50, { align: "right" })
    .text("123 Main Street", 200, 65, { align: "right" })
    .text("New York, NY, 10025", 200, 80, { align: "right" })
    .moveDown();
}

function generateCustomerInformation(doc, invoice) {
  doc
    .fillColor("#444444")
    .fontSize(20)
    .text("Invoice", 50, 160);

  generateHr(doc, 185);

  const customerInformationTop = 200;

  doc
    .fontSize(10)
    .text("Invoice Number:", 50, customerInformationTop)
    .font("Helvetica-Bold")
    .text(invoice.invoiceNo, 130, customerInformationTop)
    .font("Helvetica")
    .text("Invoice Date:", 50, customerInformationTop + 15)
    .text(formatDate(new Date()), 130, customerInformationTop + 15)

    .font("Helvetica-Bold")
    .text("Buyer:", 250, customerInformationTop)
    .font("Helvetica")
    .text(invoice.buyer.name, 250, customerInformationTop + 15)
    .font("Helvetica")
    .text(invoice.buyer.address, 250, customerInformationTop + 30)
    .text(
      invoice.buyer.city +
        ", " +
        invoice.buyer.state +
        ", " +
        invoice.buyer.country,
      250,
      customerInformationTop + 45
    )
    .font("Helvetica")
    .text(invoice.buyer.email, 250, customerInformationTop + 60)
    .font("Helvetica")
    .text(invoice.buyer.phoneNo, 250, customerInformationTop + 75)

    .font("Helvetica-Bold")
    .text("Seller:", 400, customerInformationTop)
    .font("Helvetica")
    .text(invoice.seller.name, 400, customerInformationTop + 15)
    .font("Helvetica")
    .text(invoice.seller.address, 400, customerInformationTop + 30)
    .text(
      invoice.seller.city +
        ", " +
        invoice.seller.state +
        ", " +
        invoice.seller.country,
      400,
      customerInformationTop + 45
    )
    .font("Helvetica")
    .text(invoice.seller.email, 400, customerInformationTop + 60)
    .font("Helvetica")
    .text(invoice.seller.phoneNo, 400, customerInformationTop + 75)
    .moveDown();

  generateHr(doc, 290);
}

function generateInvoiceTable(doc, invoice) {

  const invoiceTableTop = 345;

  doc.font("Helvetica-Bold");
  generateTableRow(
    doc,
    invoiceTableTop,
    "Product Name",
    "Model",
    "Model Year",
    "Serial Number",
    "Sub Total"
  );
  generateHr(doc, invoiceTableTop + 20);
  doc.font("Helvetica");

  const position = invoiceTableTop + 30;
  generateTableRow(
      doc,
      position,
      invoice.product.productName,
      invoice.product.model,
      invoice.product.modelYear,
      invoice.product.serialNumber,
      formatCurrency(invoice.product.subTotal)
    );

    generateHr(doc, position + 20); 

  const subtotalPosition = invoiceTableTop + 60;
  generateTableRow(
    doc,
    subtotalPosition,
    "",
    "",
    "Subtotal",
    "",
    formatCurrency(invoice.product.subTotal)
  );

  const totalPosition = subtotalPosition + 20;
  doc.font("Helvetica-Bold");
  generateTableRow(
    doc,
    totalPosition,
    "",
    "",
    "Total",
    "",
    formatCurrency(invoice.product.total)
  );
  doc.font("Helvetica");
}

{/*function generateFooter(doc) {
  doc
    .fontSize(10)
    .text(
      "Payment is due within 15 days. Thank you for your business.",
      50,
      780,
      { align: "center", width: 500 }
    );
}*/}

function generateTableRow(
  doc,
  y,
  productName,
  model,
  modelYear,
  serialNumber,
  subTotal
) {
  doc
    .fontSize(10)
    .text(productName, 50, y)
    .text(model, 150, y)
    .text(modelYear, 250, y)
    .text(serialNumber, 350, y)
    .text(subTotal, 450, y, { align: "right" });
}

function generateHr(doc, y) {
  doc
    .strokeColor("#aaaaaa")
    .lineWidth(1)
    .moveTo(50, y)
    .lineTo(550, y)
    .stroke();
}

function formatCurrency(cents) {
  return "$" + (cents / 100).toFixed(2);
}

function formatDate(date) {
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();

  return day + "/" + month + "/" + year;
}

module.exports = {
  createInvoice
};
