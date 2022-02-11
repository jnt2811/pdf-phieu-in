const fs = require("fs");
const { fontSize } = require("pdfkit");
const PDFDocument = require("pdfkit");
const { formatCurrency } = require("./helper")
function donthuoc2(data, path) {
    let doc = new PDFDocument({ size: "A5"});
    doc.registerFont('Cabin-Bold', 'fonts/Cabin-Bold.ttf');
    doc.registerFont('Cabin-Regular', 'fonts/Cabin-Regular.ttf');
    render(doc, data)
    doc.end();
    doc.pipe(fs.createWriteStream(path));
}


const render = (doc, data) => {
    const heightDoc = 595.28
    const widthDoc = 419.53
    const marginTop = 20 
    const marginLeft = 20
    let positionHeader = 20
    let benh_chinh = data.chuan_doan_benh_chinh
    let chuan_doan_benh_chinh = ""
    for (let i = 0; i < benh_chinh.length; i++) {
        if (i == 0 ) {
            chuan_doan_benh_chinh = chuan_doan_benh_chinh + benh_chinh[i].ten_benh
        } else {
            chuan_doan_benh_chinh = chuan_doan_benh_chinh + ", " + benh_chinh[i].ten_benh
        }
        
    }
    doc
        .font("Cabin-Regular")
        .fillColor("#000")
        .image("images/logo.png", 20, positionHeader, { with: 60, })
        .fontSize(11)
        .text(data.hospital.name, marginLeft + 50, positionHeader, { width: widthDoc / 2 - marginLeft - 50, continue: true })
        .fontSize(8)
        .text(data.hospital.phone,{ continue : true})
        ///
        .fontSize(9)
        .text("Thời gian", widthDoc - 230, positionHeader, { align: 'right', continue:true, width:200 })
        .text(`${data.time} - ${data.date}`, widthDoc - 230, positionHeader + 10, { align: 'right', width: 200 })
    const positionTitle = positionHeader + 50

    doc
        .fontSize(20)
        .text("ĐƠN THUỐC", 0 , positionTitle , {width : widthDoc , align:"center"})
    renderLine(doc, widthDoc, positionTitle + 30)
    ////
    const positionInfo = positionTitle + 40
    doc
        .fontSize(9)
        .text(`Họ và tên: ${data.benh_nhan.ho_ten}`, marginLeft , positionInfo, { width: widthDoc / 3, continue: true,align :"left"})
        .text(`Độ tuổi: ${data.benh_nhan.tuoi}` , widthDoc / 3 + (marginLeft * 2) , positionInfo , { width : widthDoc / 3, continue : true})
        .text(`Giới tính: ${data.benh_nhan.gioi_tinh}`, widthDoc / 3 * 2 , positionInfo,   { width : widthDoc / 3, continue : true})
        .text(`Nguời liên hệ : ${data.benh_nhan.nguoi_lien_he}`, marginLeft, positionInfo + 20, { width: widthDoc, })
        .text(`Địa chỉ : ${data.benh_nhan.dia_chi}`, marginLeft, positionInfo + 40, { width: widthDoc, })
        .text(`Chẩn đoán bệnh chính : ${chuan_doan_benh_chinh}`, marginLeft, positionInfo + 60, { width: widthDoc, })

    renderLine(doc, widthDoc, positionInfo + 100)
    

    ////
    const positionDrugTitle = positionInfo + 110
    doc
        .fontSize(14)
        .font("Cabin-Bold")
        .text("Thuốc điều trị", marginLeft, positionDrugTitle,)
    let positionDrug = positionDrugTitle
    let top = positionDrugTitle
    let danh_sach_thuoc = data.thuoc
    let positionFooter = 0
    for (let i = 0; i < danh_sach_thuoc.length; i++) {
        const element = danh_sach_thuoc[i];
        
        // if (top >= heightDoc) {
        //     console.log(top)
        //     doc.addPage()
        //    positionDrug = 0
        //    top = positionDrug + (i + 1) * 50
        // } 
        
        top = positionDrug + (i + 1) * 50
        console.log(i, top)
        doc
            .fontSize(8)
            .font("Cabin-Regular")
            .text(element.so_dangky, marginLeft, top)
            .text(element.ten_thuoc, marginLeft + 50, top, { width: widthDoc / 3, continue: true })
            .text(`Số lương : ${element.so_luong}`, widthDoc / 3 + 50, top, { width: widthDoc / 3, continue: true , align:"center"})
            .text(`${element.cach_dung} : ${element.lieu_dung} `, widthDoc / 3 * 2, top, { width: widthDoc / 3 - 20, continue: true, align: "right" })
            .text(`Từ : ${element.thoi_gian_bat_dau} - ${element.thoi_gian_ket_thuc}`, marginLeft, top + 20, { width: widthDoc / 3 })
            .text(`Chỉ dẫn : ${element.chi_dan}`, (widthDoc / 3), top + 20, { width: widthDoc / 3 * 2 - 20})
            
        if (i == danh_sach_thuoc.length - 1 ) {
            renderLine(doc, widthDoc, top + 50)
            positionFooter = top + 60 
        }
       
    }

    doc
        .fontSize(11)
        .text("Lời dặn :", marginLeft, positionFooter)
        .text("Bác sĩ kê đơn", widthDoc / 2, positionFooter, { width: widthDoc / 2, align: "center" })
        .fontSize(9)
        .text(data.ghi_chu, marginLeft, positionFooter + 20, { width: widthDoc / 2, continue: true })
        .moveDown(10)
        .fontSize(12)
        .text(`Khám lại mang theo đơn thuốc này`, {})
        .moveDown(10)
        

}

function renderLine(doc, x, y) {
    doc
        .strokeColor("#D0D0D0")
        .lineWidth(1)
        .moveTo(0, y)
        .lineTo(x, y)
        .stroke();
}

module.exports = {
    donthuoc2
}