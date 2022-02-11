const fs = require("fs")
const PDFDocument = require("pdfkit");
const { formatCurrency } = require("./helper")
function benhan(data, path) {
    let doc = new PDFDocument({ size: "A5" });
    doc.registerFont('Cabin-Bold', 'fonts/Cabin-Bold.ttf');
    doc.registerFont('Cabin-Regular', 'fonts/Cabin-Regular.ttf');
    renderHeader(doc, data);
    renderTitle(doc, data)
    renderInfoPatient(doc, data)
    renderReasonExam(doc, data)
    renderInfoExam(doc, data)
    doc.addPage()
    renderExam(doc, data)
    renderResult(doc, data)
    doc.end();
    doc.pipe(fs.createWriteStream(path));
}

// render avatar name hospital, phone
const renderHeader = (doc, data) => {
    const hospital = data.hospital
    const marginTop = 5
    doc
        .image("images/logo.png", 20, marginTop, { with: 50 })
        //tên bệnh viện
        .fontSize(18)
        .font("Cabin-Bold")
        .text(hospital.name, 40, marginTop, {
            width: 200,
            align: "center"
        })
        //
        .fillColor("#444444")
        .fontSize(10)
        .font("Cabin-Regular")
        .text(hospital.phone, 40, marginTop + 30, {
            width: 200,
            align: "center"
        })
    
        .fillColor("#000000")
        .fontSize(12)
        .font("Cabin-Regular")
        .text("Mã bệnh nhân", 450, marginTop , {
            width: 100,
            align: "center"
        })
        .fillColor("#808080")
        .fontSize(14)
        .font("Cabin-Regular")
        .text(data.benh_nhan.ma_benh_nhan, 450, marginTop + 20, {
            width: 100,
            align: "center"
        })
}

// render title , date , time

const renderTitle = (doc, data) => {
    const marginTop = 25
   
    doc
        // title
        .fillColor("#242424")
        .fontSize(32)
        .font("Cabin-Regular")
        .text("BỆNH ÁN NGOẠI TRÚ", 100, marginTop + 30, {
            width: 400,
            align:"center"
        })
    renderLine(doc, marginTop + 80)
}


const renderInfoPatient = (doc, data) => {
    let benh_nhan = data.benh_nhan
    const marginTop = 110
    const marginLeft = 20
    renderItemTitle(doc, "I - Hành chính", marginLeft, marginTop + 10)

    renderItemInfo(doc, "Mã định danh : ", benh_nhan.ma_dinh_danh, marginLeft, marginTop + 40, 80, 100)
    renderItemInfo(doc, "Họ & Tên :", benh_nhan.ho_ten, marginLeft + 200, marginTop + 40, 60, 200)
    renderItemInfo(doc, "Giới tính :", benh_nhan.gioi_tinh, marginLeft + 440, marginTop + 40, 80, 50)

    renderItemInfo(doc, "Ngày sinh :", benh_nhan.ngay_sinh, marginLeft, marginTop + 65, 80, 100)
    renderItemInfo(doc, "Số điện thoại :", benh_nhan.so_dien_thoai, marginLeft + 200, marginTop + 65, 80, 200)
    renderItemInfo(doc, "Nhóm máu :", benh_nhan.nhom_mau, marginLeft + 440, marginTop + 65, 80, 50)

    renderItemInfo(doc, "Email :", benh_nhan.email, marginLeft, marginTop + 90, 50, 100)
    renderItemInfo(doc, "Địa chỉ :", benh_nhan.dia_chi, marginLeft + 200, marginTop + 90, 50, 300)

    renderItemInfo(doc, "Quận, huyện :", benh_nhan.quan_huyen, marginLeft, marginTop + 115, 80, 100)
    renderItemInfo(doc, "Xã, phường :", benh_nhan.xa_phuong, marginLeft + 200, marginTop + 115, 80, 200)
    renderItemInfo(doc, "Tỉnh, thành phố :", benh_nhan.tinh_thanhpho, marginLeft + 390, marginTop + 115, 100, 100)

    renderItemInfo(doc, "Dân tộc :", benh_nhan.dan_toc, marginLeft, marginTop + 140, 60, 40)
    renderItemInfo(doc, "Tôn giáo :", benh_nhan.ton_giao, marginLeft + 150, marginTop + 140, 50, 60)
    renderItemInfo(doc, "Quốc tịch :", benh_nhan.quoc_tich, marginLeft + 270, marginTop + 140, 60, 60)
    renderItemInfo(doc, "Văn hoá :", benh_nhan.van_hoa, marginLeft + 440, marginTop + 140, 60, 60)

    renderItemInfo(doc, "Số CMND/CCCD :", benh_nhan.chung_minh_thu, marginLeft, marginTop + 165, 100, 150)
    renderItemInfo(doc, "Hộ chiếu :", benh_nhan.ho_chieu, marginLeft + 270, marginTop + 165, 60, 200)

    renderItemInfo(doc, "Nghề nghiệp :", benh_nhan.nghe_nghiep, marginLeft, marginTop + 190, 80, 150)
    renderItemInfo(doc, "Nơi công tác :", benh_nhan.noi_cong_tac, marginLeft + 270, marginTop + 190, 80, 200)
    
    renderItemInfo(doc, "Mã thẻ BHYT :", benh_nhan.bhyt, marginLeft, marginTop + 215, 80, 200)
    renderItemInfo(doc, "Giá trị thẻ đến :", benh_nhan.gia_tri_the_den, marginLeft + 270, marginTop + 215, 80, 200)

    renderItemInfo(doc, "Người liên hệ :", benh_nhan.nguoi_lien_he, marginLeft, marginTop + 240, 80, 200)
    renderItemInfo(doc, "Số điện thoại người liên hệ :", benh_nhan.sdt_nguoi_len_he, marginLeft + 270, marginTop + 240, 150, 200)

    renderItemInfo(doc, "Địa chỉ nơi báo tin :", benh_nhan.dia_chi_bao_tin, marginLeft, marginTop + 265, 100, 400)

    renderItemInfo(doc, "Đi khám bệnh lúc :", benh_nhan.kham_benh_luc, marginLeft, marginTop + 290, 100, 200)
}


const renderReasonExam = (doc, data) => {
    const marginTop = 400
    const marginLeft = 20
    renderItemTitle(doc, "II - Lý do khám", marginLeft, marginTop + 30)

    renderTextDetail(doc, data.ly_do_kham, marginLeft + 20, marginTop + 60)
}

// hỏi bệnh
const renderInfoExam = (doc, data) => {
    const marginTop = 480
    const marginLeft = 20
    renderItemTitle(doc, "III - Hỏi bệnh", marginLeft, marginTop + 30)

    renderSecondTitle(doc, "Quá trình bệnh lý", marginLeft + 10, marginTop + 60)
    renderTextDetail(doc, data.qua_trinh_benh_ly, marginLeft + 20, marginTop + 90)

    renderSecondTitle(doc, "Tiền sử bệnh", marginLeft + 10, marginTop + 150)
    doc
        .fillColor("#1D2646")
        .fontSize(12)
        .font("Cabin-Regular")
        .text("Tiền sử bản thân", marginLeft + 20, marginTop + 180)
    doc
        .fillColor("#1D2646")
        .fontSize(12)
        .font("Cabin-Regular")
        .text("Tiền sử bản thân", marginLeft + 300, marginTop + 180)
    renderTextDetail(doc, data.tien_su_benh.tien_su_ban_than, marginLeft + 20, marginTop + 210 , 250)
    renderTextDetail(doc, data.tien_su_benh.tien_su_gia_dinh, marginLeft + 300, marginTop + 210, 250)
    doc
        .strokeColor("#D0D0D0")
        .lineWidth(1)
        .moveTo(280, marginTop + 180)
        .lineTo(281, 820)
        .stroke();
}

// khám bệnh

const renderExam = (doc, data) => {
    let kham_benh = data.kham_benh
    let chi_so = data.chi_so
    const marginTop = 10
    const marginLeft = 20
    renderItemTitle(doc, "IV - Khám bệnh", marginTop, marginLeft)
    doc
        .fillColor("#1D2646")
        .fontSize(12)
        .font("Cabin-Regular")
        .text("Khám toàn thân", marginLeft + 10, marginTop + 40)
    renderTextDetail(doc, kham_benh.kham_toan_than, marginLeft + 10, marginTop + 60, 300)
    
    doc
        .fillColor("#1D2646")
        .fontSize(12)
        .font("Cabin-Regular")
        .text("Khám toàn thân", marginLeft + 10, marginTop + 130)
    renderTextDetail(doc, kham_benh.kham_bo_phan, marginLeft + 10, marginTop + 150, 300)

    doc
        .fillColor("#1D2646")
        .fontSize(12)
        .font("Cabin-Regular")
        .text("Tóm tắt kết quả cận lâm sàng", marginLeft + 10, marginTop + 220)
    renderTextDetail(doc, kham_benh.kq_cls, marginLeft + 10, marginTop + 240, 300)

    doc
        .fillColor("#1D2646")
        .fontSize(12)
        .font("Cabin-Regular")
        .text("Chuẩn đoán bệnh chính", marginLeft + 10, marginTop + 320)
    // renderTextDetail(doc, kham_benh.kham_toan_than, marginLeft + 10, marginTop + 60, 350)
    renderSick(doc, kham_benh.chuan_doan_benh_chinh, marginLeft + 30, marginTop + 320)


    doc
        .fillColor("#1D2646")
        .fontSize(12)
        .font("Cabin-Regular")
        .text("Chuẩn đoán bệnh phụ", marginLeft + 10, marginTop + 450)
    renderSick(doc, kham_benh.chuan_doan_benh_chinh, marginLeft + 30, marginTop + 460)

    renderSecondTitle(doc, "Chỉ số sinh tồn", marginLeft + 350, marginTop + 40)
    renderIndex(doc, "Nhịp tim", chi_so.nhip_tim, "nhịp/phút", marginLeft + 350, marginTop + 80)
    renderIndex(doc, "Huyết áp", chi_so.huyet_ap, "mmHg", marginLeft + 350, marginTop + 110)
    renderIndex(doc, "Nhiệt độ", chi_so.nhiet_do, "C", marginLeft + 350, marginTop + 140)
    renderIndex(doc, "Nhịp thở", chi_so.nhip_tho, "nhịp/phút", marginLeft + 350, marginTop + 170)
    renderIndex(doc, "Cân nặng", chi_so.can_nang, "Kg", marginLeft + 350, marginTop + 200)
    renderIndex(doc, "Chiều cao", chi_so.chieu_cao, "cm", marginLeft + 350, marginTop + 230)
    renderIndex(doc, "SP02", chi_so.sp02, "%", marginLeft + 350, marginTop + 260)
    renderIndex(doc, "BMI", chi_so.bmi, "%", marginLeft + 350, marginTop + 290)
    doc
        .strokeColor("#D0D0D0")
        .lineWidth(1)
        .moveTo(350, 10)
        .lineTo(351, 600)
        .stroke();
}

const renderIndex = (doc, title, value, content, x, y) => {
    doc
        .fillColor("#1D2646")
        .fontSize(12)
        .font("Cabin-Regular")
        .text(title, x, y)
        .fillColor("#FF4E4E")
        .text(value, x + 60, y, {width : 60})
        .fillColor("#1D2646")
        .text(content, x + 100, y)
}

const renderResult = (doc, data) => {
    const marginTop = 600
    const marginLeft = 20
    renderItemTitle(doc, "V - Kết quả và hướng điều trị", marginLeft, marginTop + 20)
    renderTextDetail(doc, data.ket_qua, marginLeft + 20, marginTop + 50)
    doc
        .fillColor("#1D2646")
        .fontSize(12)
        .text("Bác sĩ khám bệnh", 400, marginTop + 120, )
}

const renderSick = (doc, data, x, y) => {
    let i
    for (i = 0; i < data.length; i++) {
        const item = data[i];
        let position = y + (i + 1) *25
        renderTextDetail(doc, `•   ${item.ten_benh}`, x, position , 350)
    }
}

const renderTextDetail = (doc, text, x, y, width) => {
    doc
        .fillColor("#808080")
        .fontSize(12)
        .font("Cabin-Regular")
        .text(text, x, y, {width})
}

const renderItemTitle = (doc, title, x, y) => {
    doc
        .fillColor("#FF4E4E")
        .fontSize(16)
        .font("Cabin-Regular")
        .text(title, x, y)
}

const renderSecondTitle = (doc, title, x, y) => {
    doc
        .fillColor("#3E7FFF")
        .fontSize(14)
        .font("Cabin-Regular")
        .text(title, x, y)
}

const renderItemInfo = (doc,title, content ,x, y, marginLeft, width,) => {
    doc
        .fillColor("#3E7FFF")
        .fontSize(12)
        .font("Cabin-Regular")
        .text(title, x, y)
        .fillColor("#1D2646")
        .text(content, x + marginLeft, y , {width :width})
}

function renderLine(doc, y) {
    doc
        .strokeColor("#D0D0D0")
        .lineWidth(1)
        .moveTo(0, y)
        .lineTo(595.28, y)
        .stroke();
}



module.exports = {
    benhan
}

