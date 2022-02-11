const fs = require("fs");
const PDFDocument = require("pdfkit");
const { renderLine, formatCurrency } = require("./helper");
function donthuoc(data, path) {
  let doc = new PDFDocument({ size: "A5" });
  doc.registerFont("Cabin-Bold", "fonts/Cabin-Bold.ttf");
  doc.registerFont("Cabin-Regular", "fonts/Cabin-Regular.ttf");
  renderHeader(doc, data);
  renderTitle(doc, data);
  renderInfoPatient(doc, data);
  renderSick(doc, data);
  doc.end();
  doc.pipe(fs.createWriteStream(path));
}

// render avatar name hospital, phone
const renderHeader = (doc, data) => {
  const hospital = data.hospital;
  const marginTop = 10;
  doc
    .image("images/logo.png", 100, marginTop, { with: 50 })
    //tên bệnh viện
    .fontSize(15)
    .font("Cabin-Bold")
    .text(hospital.name, 70, marginTop, {
      width: 300,
      align: "center",
    })
    //
    .fillColor("#444444")
    .fontSize(10)
    .font("Cabin-Regular")
    .text(hospital.phone, 70, marginTop + 20, {
      width: 300,
      align: "center",
    });
};

// render title , date , time

const renderTitle = (doc, data) => {
  const marginTop = 50;
  doc
    // title
    .fillColor("#242424")
    .fontSize(30)
    .font("Cabin-Bold")
    .text("ĐƠN THUỐC", 100, marginTop, {
      width: 200,
      align: "center",
    })
    //date tim
    .fontSize(10)
    .font("Cabin-Regular")
    .text(` Thời gian : ${data.time} - ${data.date}`, 100, marginTop + 40, {
      width: 200,
      align: "center",
    });
  renderLine(doc, 419, marginTop + 70);
};

const renderInfoPatient = (doc, data) => {
  let benh_nhan = data.benh_nhan;
  const marginTop = 120;
  const marginLeft = 30;
  renderItemInfo(
    doc,
    "Họ & Tên :",
    benh_nhan.ho_ten,
    marginLeft,
    marginTop + 20,
    50,
    120
  );
  renderItemInfo(
    doc,
    "Độ tuổi :",
    benh_nhan.tuoi,
    marginLeft + 180,
    marginTop + 20,
    40,
    40
  );
  renderItemInfo(
    doc,
    "Giới tính :",
    benh_nhan.gioi_tinh,
    marginLeft + 270,
    marginTop + 20,
    50,
    40
  );
  renderItemInfo(
    doc,
    "Người liên hệ :",
    benh_nhan.nguoi_lien_he,
    marginLeft,
    marginTop + 40,
    150
  );
  renderItemInfo(
    doc,
    "Địa chỉ :",
    benh_nhan.dia_chi,
    marginLeft,
    marginTop + 60,
    50
  );

  doc
    .strokeColor("#242424")
    .lineWidth(0.5)
    .moveTo(20, marginTop + 90)
    .lineTo(400, marginTop + 90)
    .stroke();
};

const renderSick = (doc, data) => {
  let benh_chinh = data.chuan_doan_benh_chinh;
  let benh_phu = data.chuan_doan_benh_phu;
  let thuoc = data.thuoc;
  const marginTop = 210;
  const marginLeft = 30;
  let i;
  let j;
  let k;
  renderSecondTitle(
    doc,
    "Chuẩn đoán bệnh chính : ",
    marginLeft,
    marginTop + 10
  );
  for (i = 0; i < benh_chinh.length; i++) {
    const item = benh_chinh[i];
    const position = marginTop + 10 + (i + 1) * 25;
    renderItemSick(doc, item, marginLeft, position);
  }
  let benh_phu_position = marginTop + 10 + i * 30;
  renderSecondTitle(
    doc,
    "Chuẩn đoán bệnh phụ: ",
    marginLeft,
    benh_phu_position + 10
  );
  for (j = 0; j < benh_phu.length; j++) {
    const item = benh_phu[j];
    const position = benh_phu_position + 5 + (j + 1) * 25;
    renderItemSick(doc, item, marginLeft, position);
  }
  let thuoc_position = benh_phu_position + j * 25;
  doc
    .strokeColor("#242424")
    .lineWidth(0.5)
    .moveTo(20, thuoc_position + 30)
    .lineTo(400, thuoc_position + 30)
    .stroke();

  let title_thuoc_position = thuoc_position + 50;
  doc
    .fillColor("#242424")
    .fontSize(14)
    .font("Cabin-Bold")
    .text("Thuốc", 150, title_thuoc_position, { width: 100, align: "center" });

  let bang_thuoc_postion = title_thuoc_position + 10;
  //renderItemDrug(doc, thuoc[0], marginLeft, bang_thuoc_postion)
  let position;
  for (k = 0; k < thuoc.length; k++) {
    const item = thuoc[k];
    if (k === 0) {
      renderItemDrug(doc, item, marginLeft, bang_thuoc_postion);
      doc.addPage();
    }
    position = (k - 1) * 105;
    renderItemDrug(doc, item, marginLeft, position);
  }
  const ghi_chu_position = position + 130;
  doc
    .fillColor("#242424")
    .fontSize(10)
    .font("Cabin-Regular")
    .text("Ghi chú", marginLeft, ghi_chu_position, {
      width: 100,
      align: "center",
    });

  doc
    .fillColor("#242424")
    .fontSize(10)
    .font("Cabin-Regular")
    .text("Bác sĩ kê đơn", marginLeft + 250, ghi_chu_position + 100, {
      width: 100,
      align: "center",
    });
};

const renderItemDrug = (doc, item, x, y) => {
  doc
    .fontSize(9)
    .fillColor("#242424")
    .font("Cabin-Regular")
    .text(item.so_dangky, x, y + 30)
    .text(item.ten_thuoc, x + 50, y + 30)
    .text(`Số lương : ${item.so_luong}`, x + 280, y + 30, { width: 100 })
    .text(`${item.cach_dung} :      ${item.lieu_dung} `, x, y + 50)
    .text(
      `Từ : ${item.thoi_gian_bat_dau}     Đến : ${item.thoi_gian_ket_thuc} `,
      x + 215,
      y + 50,
      { width: 150 }
    )
    .text(`Chỉ dẫn : ${item.chi_dan}`, x, y + 70);
  doc
    .strokeColor("#242424")
    .lineWidth(0.5)
    .moveTo(20, y + 105)
    .lineTo(400, y + 105)
    .stroke();
};

const renderItemSick = (doc, item, x, y) => {
  doc
    .fillColor("#242424")
    .font("Cabin-Regular")
    .fontSize(10)
    .text(`•   ${item.id} - ${item.ten_benh}`, x, y);
};

const renderSecondTitle = (doc, title, x, y) => {
  doc.fillColor("#3E7FFF").fontSize(10).font("Cabin-Regular").text(title, x, y);
};

const renderItemInfo = (doc, title, content, x, y, marginLeft, width) => {
  doc
    .fillColor("#3E7FFF")
    .fontSize(10)
    .font("Cabin-Regular")
    .text(title, x, y)
    .fillColor("#1D2646")
    .text(content, x + marginLeft, y, { width: width });
};

module.exports = {
  donthuoc,
};
