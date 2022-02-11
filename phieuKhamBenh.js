const fs = require("fs")
const PDFDocument = require("pdfkit");
const { renderLine, formatCurrency } = require("./helper")
const widthDoc = 209
const heightDoc = 297.64

function phieuKhamBenh(data, path) {
    let doc = new PDFDocument({ size: "A7"  });
    doc.registerFont('Cabin-Bold', 'fonts/Cabin-Bold.ttf');
    doc.registerFont('Cabin-Regular', 'fonts/Cabin-Regular.ttf');
    renderHeader(doc, data);
    renderTitle(doc, data)
    renderInfo(doc, data)
    // renderSignature(doc, data)
    doc.end();
    doc.pipe(fs.createWriteStream(path));
}

// render avatar name hospital, phone
const renderHeader = (doc, data) => {
    
    const hospital = data.hospital
    const marginTop = 5
    doc
        .image("images/logo_2.png", widthDoc / 6, marginTop, { with: 20 })
        //tên bệnh viện
        .fillColor("#000")
        .fontSize(8)
        .font("Cabin-Bold")
        .text(hospital.name, widthDoc / 6 + 30, marginTop, {
            width: widthDoc / 6 * 3,
            align: "center",
            continue : true
        })
        //
        
        .fontSize(8)
        .font("Cabin-Regular")
        .text(hospital.phone, {
            width: widthDoc / 6 * 3,
            align: "center"
        })
}

// render title , date , time

const renderTitle = (doc, data) => {
    const marginTop = 50    
    renderLine(doc, 300, marginTop + 10)
    doc
        // title
        .fillColor("#242424")
        .fontSize(18)
        .font("Cabin-Bold")
        .text("PHIẾU KHÁM BỆNH", 25, marginTop + 20, {
            width: 200
        })
        
    
}
const renderInfo = (doc, data) => {
    const marginTop = 100
    const marginLeft = 10
    renderItem(doc, "Họ & Tên : ", data.ho_ten, marginLeft, marginTop + 10 , 40,)
    // renderItem(doc, "Giới tính: ", data.gioi_tinh, marginLeft + 100, marginTop + 10,35 , 25)
    renderItem(doc, "Độ tuổi : ", data.tuoi, marginLeft , marginTop + 30, 40)
    
    renderItem(doc, "Giờ tiếp nhận: ", data.gio_tiep_nhan, marginLeft, marginTop + 50, 50, widthDoc / 2)
    //renderItem(doc, "Ngày: ", data.ngay_tiep_nhan, widthDoc / 2, marginTop + 50, 30, widthDoc / 2)
    doc 
        .text(`Ngày : ${data.ngay_tiep_nhan}` , widthDoc  / 2 , marginTop + 50, {width : widthDoc / 2 - 20, align:"right" })
        .fontSize(12)
        .text(`Phòng : ${data.khoa_dieu_tri}`, 0, marginTop + 70, { align: "center", width: widthDoc })
        .fontSize(30)
        .font("Cabin-Bold")
        .text(`STT: ${data.stt}`, 0, marginTop + 85, { align: "center", width: widthDoc })
        .strokeColor("#D0D0D0")
        .lineWidth(1)
        .moveTo(0, 250)
        .lineTo(widthDoc, 250)
        .stroke()
        // .font("Cabin-Regular")
        // .fontSize(9)
        // .text(`Bệnh nhân vui lòng chờ tới số thứ tự)`, 0, marginTop + 110, {  align: "center", continue : true , width : widthDoc})

}

const renderItem = (doc, title, content, x, y, z = 40, width) => {
    doc
        .fillColor("#000")
        .fontSize(8)
        .font("Cabin-Regular")
        .text(title, x, y)
        .fillColor("#1D2646")
        .text(content, x + z, y, { width: width, continue: true} )
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
    phieuKhamBenh
}

