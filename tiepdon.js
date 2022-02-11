const fs = require("fs");
const PDFDocument = require("pdfkit");

function tiepdon(data, path) {
  let doc = new PDFDocument({ size: "A6" });
  doc.registerFont("Cabin-Bold", "fonts/Cabin-Bold.ttf");
  doc.registerFont("Cabin-Regular", "fonts/Cabin-Regular.ttf");
  doc.registerFont("Cabin-Medium", "fonts/Cabin-Medium.ttf");
  doc.registerFont("Cabin-SemiBold", "fonts/Cabin-SemiBold.ttf");
  doc.registerFont("Cabin-Italic-Regular", "fonts/Cabin-Italic.ttf");
  doc.page.margins.bottom = 0;

  /**
   ** Start below this comment
   */

  renderHeader(doc, data);
  renderMainBody(doc, data);
  renderFooter(doc, data);

  /**
   ** End above this comment
   */

  doc.end();
  doc.pipe(fs.createWriteStream(path));
}

module.exports = tiepdon;

const renderHeader = (doc, data) => {
  const { name, phone } = data.hospital;

  doc.image("images/logo_3.png", 58, 13, { width: 30 });

  doc
    .fillColor("#000")
    .fontSize(15)
    .font("Cabin-Bold")
    .text(name, 94, 12, { width: 203, align: "left" });

  doc
    .fillColor("#000")
    .fontSize(10)
    .font("Cabin-Regular")
    .text(phone, 94, 30, { width: 203, align: "left" });

  renderLine(doc, doc.page.width, 54);
};

const renderMainBody = (doc, data) => {
  const { stt, ten_phong_kham } = data;
  const { name, address, gender, yob } = data.patient;
  const { so_the_bhyt, han_the_den, doi_tuong, kham_ngay } = data.bao_hiem;

  doc.image("images/logo_bg.png", 64, 140, {
    fit: [170, 170],
    align: "center",
    valign: "center",
  });

  doc
    .fillColor("#000")
    .fontSize(40)
    .font("Cabin-Bold")
    .text(`STT:${stt}`, 0, 58, {
      width: doc.page.width,
      align: "center",
    });

  doc
    .fillColor("#000")
    .fontSize(13)
    .font("Cabin-Medium")
    .text(ten_phong_kham, 0, 107, {
      width: doc.page.width,
      align: "center",
    });

  doc.fillColor("#000").fontSize(13).font("Cabin-Medium").text(name, 0, 127, {
    width: doc.page.width,
    align: "center",
  });

  doc
    .fillColor("#000")
    .fontSize(10)
    .font("Cabin-Regular")
    .text("Địa chỉ:", 29, 150, {
      width: doc.page.width - 29,
      align: "left",
    })
    .font("Cabin-Medium")
    .text(address, 62, 150, {
      width: doc.page.width - 29,
      align: "left",
    });

  doc
    .fillColor("#000")
    .fontSize(10)
    .font("Cabin-Regular")
    .text("Giới tính:", 29, 170, {
      width: 86,
      align: "left",
    })
    .font("Cabin-Medium")
    .text(gender, 68, 170, {
      width: doc.page.width - 64,
      align: "left",
    });

  doc
    .fillColor("#000")
    .fontSize(10)
    .font("Cabin-Regular")
    .text("Năm sinh:", 115, 170, {
      width: doc.page.width - 115,
      align: "left",
    })
    .font("Cabin-Medium")
    .text(yob, 160, 170, {
      width: doc.page.width - 150,
      align: "left",
    });

  doc
    .fillColor("#000")
    .fontSize(14)
    .font("Cabin-Regular")
    .text("Bảo hiểm", 29, 196, {
      width: doc.page.width - 29,
      align: "left",
    });

  doc
    .fillColor("#000")
    .fontSize(10)
    .font("Cabin-Medium")
    .text("Số thẻ BHYT:", 29, 220, {
      width: doc.page.width - 29,
      align: "left",
    })
    .fillColor("#000")
    .font("Cabin-Bold")
    .text(han_the_den, 87, 220, {
      width: doc.page.width - 87,
      align: "left",
    });

  doc
    .fillColor("#000")
    .fontSize(10)
    .font("Cabin-Medium")
    .text("Hạn thẻ đến:", 29, 240, {
      width: doc.page.width - 29,
      align: "left",
    })
    .fillColor("#000")
    .font("Cabin-Bold")
    .text(han_the_den, 85, 240, {
      width: doc.page.width - 85,
      align: "left",
    });

  doc
    .fillColor("#000")
    .fontSize(10)
    .font("Cabin-Regular")
    .text("Đối tượng:", 29, 260, {
      width: doc.page.width - 29,
      align: "left",
    })
    .fillColor("#000")
    .font("Cabin-Bold")
    .text(doi_tuong, 75, 260, {
      width: doc.page.width - 75,
      align: "left",
    });

  doc
    .fillColor("#000")
    .fontSize(10)
    .font("Cabin-Regular")
    .text("Khám ngày:", 29, 280, {
      width: doc.page.width - 29,
      align: "left",
    })
    .fillColor("#000")
    .font("Cabin-Bold")
    .text(kham_ngay, 80, 280, {
      width: doc.page.width - 80,
      align: "left",
    });

  renderLine(doc, doc.page.width, 303);
};

const renderFooter = (doc, data) => {
  doc
    .fillColor("#000")
    .fontSize(10)
    .font("Cabin-Regular")
    .text("Quét mã QR để kiểm tra trạng thái khám bệnh", 0, 310, {
      width: doc.page.width,
      align: "center",
    });

  doc
    .fillColor("#000")
    .fontSize(8)
    .font("Cabin-Regular")
    .text("Người ĐT: Quản trị hệ thống", 0, 392, {
      width: doc.page.width,
      align: "center",
    });

  doc
    .fillColor("#000")
    .fontSize(8)
    .font("Cabin-Italic-Regular")
    .text("Phiếu chỉ có giá trị trong ngày !", 0, 402, {
      width: doc.page.width,
      align: "center",
    });
};

const renderLine = (doc, x, y) => {
  doc.strokeColor("#ebebeb").lineWidth(1).moveTo(0, y).lineTo(x, y).stroke();
};
