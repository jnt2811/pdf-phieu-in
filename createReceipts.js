const fs = require("fs")
const PDFDocument = require("pdfkit");
const heightDoc = 595.28
const widthDoc = 419.53
function createReceipts(data, path) {
    let doc = new PDFDocument({ size: "A5", margin: 20 });
    doc.registerFont('Cabin-Bold', 'fonts/Cabin-Bold.ttf');
    doc.registerFont('Cabin-Regular', 'fonts/Cabin-Regular.ttf');
    //generateHeader(doc);
    // generateTitle(doc)
    // generateCustomerInformation(doc, invoice);
    // generateInvoiceTable(doc, invoice);
    // generateFooter(doc);
    renderHeader(doc, data)
    renderTitle(doc, data)
    renderInfoPatient(doc, data)
    renderTable(doc, data)

    doc.end();
    doc.pipe(fs.createWriteStream(path));
}

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
    const marginTop = 100
    doc
        // title
        .fontSize(22)
        .font("Cabin-Bold")
        .text("PHIẾU THU", 0, marginTop, {
            align:"center"
        })
        //date time
        // .fontSize(12)
        // .font("Cabin-Regular")
        // .text(` Thời gian : ${data.time} - ${data.date}`, 0 , marginTop + 30, {
        //     align: "center"
        // })
}

const renderInfoPatient = (doc, data) => {
    let patient = data.patient
    const marginTop = 160
    renderLine(doc, marginTop)
    doc
        // name
        .fillColor("#000000")
        .fontSize(10)
        .text(patient.name, 90, marginTop + 10)
        .font("Cabin-Regular")
        .fillColor("#000000")
        .text("Họ & Tên : ", 30, marginTop + 10)
        .font("Cabin-Regular")
    
    //phone
        .fillColor("#000000")
        .fontSize(10)
        .text(patient.phone, 90, marginTop + 28)
        .font("Cabin-Regular")
        .fillColor("#000000")
        .text("Điện thoại : ", 30, marginTop + 28)
        .font("Cabin-Regular")
        
    
    //addresss
        .fillColor("#000000")
        .fontSize(10)
        .text(patient.address, 90, marginTop + 48)
        .font("Cabin-Regular")
        .fillColor("#000000")
        .text("Địa chỉ : ", 30, marginTop + 48)
        .font("Cabin-Regular")
        
    
        // age
        .fillColor("#000000")
        .fontSize(10)
        .text(patient.age, 240, marginTop + 10)
        .font("Cabin-Regular")
        .fillColor("#000000")
        .text("Độ tuổi :  ", 200, marginTop + 10)
        .font("Cabin-Regular")
        
        // gender
        .fillColor("#000000")
        .fontSize(10)
        .text(patient.gender, 350, marginTop + 10)
        .font("Cabin-Regular")
        .fillColor("#000000")
        .text("Giới tính : ", 300, marginTop + 10)
        .font("Cabin-Regular")
       
    renderLine(doc, marginTop + 70)
    
}

const renderTable = (doc, data) => {
    const listService = data.service
    const marginTop = 240
    let i
    doc
        .font("Cabin-Bold")
        .fontSize(18)
        .fillColor("#000000")
    renderTableRow(
        doc,
        marginTop,
        "STT",
        "TÊN DỊCH VỤ",
        "CHIẾT KHẤU",
        "GIÁ KHÁM"
    )
    renderLine(doc, marginTop + 20)
    // render bảng danh sách dịch vụ
    doc.font("Cabin-Regular").fillColor("#000000")
    for (i = 0; i < listService.length; i++) {
        const item = listService[i];
        let positionTop = marginTop + (i + 1) * 30
        renderTableRow(
            doc,
            positionTop,
            item.stt,
            item.ten_dich_vu,
            item.chiet_khau + " %",
            formatCurrency(item.gia_kham , "" , true)
        )
        
    }
    renderLine(doc, marginTop + (i + 1) * 30);
    /// render phần tổng tiền
    const tong_tien_position = marginTop + (i + 1) * 30 + 10;
    doc
        .font("Cabin-Bold").fontSize(11).fillColor("#000000").text("Tổng tiền", 70, tong_tien_position)
        .font("Cabin-Regular").fillColor("#000000").text(formatCurrency(data.tong_tien, "", true), 320, tong_tien_position)
    
        .font("Cabin-Bold").fontSize(11).fillColor("#000000").text("Chiết khấu", 70, tong_tien_position + 20)
        .font("Cabin-Regular").fillColor("#000000").text(formatCurrency(data.chiet_khau, "", true), 320, tong_tien_position + 20)
    
        .font("Cabin-Bold").fontSize(11).fillColor("#000000").text("Phải thu", 70, tong_tien_position + 40)
        .font("Cabin-Regular").fillColor("#000000").text(formatCurrency(data.phai_thu, "", true), 320, tong_tien_position + 40)
    
        .font("Cabin-Bold").fontSize(11).fillColor("#000000").text("Thực thu", 70, tong_tien_position + 60)
        .font("Cabin-Regular").fillColor("#000000").text(formatCurrency(data.thuc_thu, "", true), 320, tong_tien_position + 60)
    
        .font("Cabin-Bold").fontSize(11).fillColor("#000000").text("Tiền thừa", 70, tong_tien_position + 80)
        .font("Cabin-Regular").fillColor("#000000").text(formatCurrency(data.tien_thua, "", true), 320, tong_tien_position + 80)
    
        .font("Cabin-Bold").fontSize(11).fillColor("#000000").text("Người nộp tiền", 0, tong_tien_position + 110 , {align:"center", width : widthDoc/ 2} )
        .font("Cabin-Bold").fillColor("#000000").text("Người nhận tiền", widthDoc/2 , tong_tien_position + 110,{align:"center", width : widthDoc /2})
    
}


const renderTableRow = (
    doc,
    y,
    stt,
    ten_dich_vu,
    chiet_khau,
    gia_kham,
    isBold
) => {
    doc
        .fontSize(10)
        .text(stt, 30, y)
        .text(ten_dich_vu, 70, y, {width :190 })
        .text(chiet_khau, 240, y,{width : 70, align:"center"})
        .text(gia_kham, 320, y)
}


function renderLine(doc, y) {
    doc
        .strokeColor("#D0D0D0")
        .lineWidth(1)
        .moveTo(0, y)
        .lineTo(440, y)
        .stroke();
}

function formatCurrency(num, currency = "", isFull = false) {
    if (!num || num === "") {
        let response = "0 " + currency;
        return response;
    }
    num = Number(num);
    if (num === 0) {
        return "0 " + currency;
    }
    if (num.length == 2) {
        if (num === "00") {
            num = num.replace("00", "0");
        }
    }
    if (num.length > 1) {
        let first = num.substring(0, 1);
        if (first === "0") {
            num = num.substring(1, num.length);
        }
    }
    let result = num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.");
    if (!isFull) {
        result = result + ".000 ";
    }
    return result + currency;
}
module.exports = {
    createReceipts
}

