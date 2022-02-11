const fs = require("fs")
const PDFDocument = require("pdfkit");
const { renderLine, formatCurrency } = require("./helper")
function createPayments(data, path) {
    let doc = new PDFDocument({ size: "A5" });
    doc.registerFont('Cabin-Bold', 'fonts/Cabin-Bold.ttf');
    doc.registerFont('Cabin-Regular', 'fonts/Cabin-Regular.ttf');
    renderHeader(doc, data);
    renderTitle(doc, data)
    renderInfo(doc, data)
    renderSignature(doc, data)
    doc.end();
    doc.pipe(fs.createWriteStream(path));
}
const heightDoc = 595.28
const widthDoc = 419.53
// render avatar name hospital, phone
const renderHeader = (doc, data) => {
    const marginTop = 20
    let positionHeader = 20
    const marginLeft = 20
    doc
        .font("Cabin-Regular")
        .fillColor("#000")
        .image("images/logo.png", 20, positionHeader, { with: 60, })
        .fontSize(11)
        .text(data.hospital.name, marginLeft + 40, positionHeader, { width: widthDoc / 2 - marginLeft - 50, continue: true })
        .fontSize(8)
        .text(data.hospital.phone, { continue: true })
        ///
        .fontSize(9)
        .text("Thời gian", widthDoc - 230, positionHeader, { align: 'right', continue: true, width: 200 })
        .text(`${data.time} - ${data.date}`, widthDoc - 230, positionHeader + 10, { align: 'right', width: 200 })
}

// render title , date , time

const renderTitle = (doc, data) => {
    const marginTop = 80
    doc
        // title
        .fillColor("#242424")
        .fontSize(30)
        .font("Cabin-Bold")
        .text("PHIẾU CHI", 130, marginTop, {
            width:200
        })
        //date time
        // .fillColor("#808080")
        // .fontSize(10)
        // .font("Cabin-Regular")
        // .text(` Thời gian : ${data.time} - ${data.date}`, 130, marginTop + 40, {
        //     width:200
        // })
    renderLine(doc, 419, marginTop + 80)
}
const renderInfo = (doc, data) => {
    const marginTop = 160
    const marginLeft = 50
    doc
        .fillColor("#242424")
        .font("Cabin-Regular")
        .fontSize(12)
        .text("Người nhận : " , marginLeft , marginTop + 20)
        .fillColor("#1D2646")
        .text(data.don_vi_nhan, marginLeft + 80, marginTop + 20)
    
        .fillColor("#242424")
        .text("Người chi : ", marginLeft, marginTop + 45)
        .fillColor("#1D2646")
        .text(data.nguoi_chi, marginLeft + 80, marginTop + 45)

    doc
        .fillColor("#242424")
        .font("Cabin-Regular")
        .fontSize(12)
        .text("Số tiền : ", marginLeft, marginTop + 95)
        .fillColor("#242424")
        .text(formatCurrency(data.tien_chi, "", true), marginLeft + 50, marginTop + 95)

    
    doc.fillColor("#242424")
        .font("Cabin-Regular")
        .fontSize(12)
        .text("Ghi chú : ", marginLeft, marginTop + 160)
        .fontSize(10)
        .fillColor("#808080")
        .text(data.ghi_chu, marginLeft, marginTop + 180)
}

const renderSignature = (doc, data) => {
    const marginTop = 370
    doc
        .fillColor("#1D2646")
        .font("Cabin-Regular")
        .fontSize(12)
        .text("Kế toán", 65, marginTop + 50, { width: 100 })
        
        .text("Người chi", 165, marginTop + 50, { width: 100 })
    
        .text("Người nhận", 265, marginTop + 50, { width: 100 })
    
        .fillColor("#808080")
        .fontSize(10)
        .text("(Ký , họ tên)", 60, marginTop + 100, { width: 100 })
        .text("(Ký , họ tên)", 265, marginTop + 100, { width: 100 })

}





module.exports = {
    createPayments
}

