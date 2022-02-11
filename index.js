const { createReceipts } = require("./createReceipts.js");
const { createPayments } = require("./createPayments");
const { phieuKhamBenh } = require("./phieuKhamBenh.js");
const { benhan } = require("./createBenhAn.js");
const { donthuoc } = require("./donthuoc.js");
const { donthuoc2 } = require("./donthuoc2.js");
const tiepdon = require("./tiepdon");
const data = {
  hospital: {
    avatar:
      "https://printgo.vn/uploads/file-logo/1/x512x512.747d5219a89da42fe2408c84760b2bf3.ai.1.png.pagespeed.ic.onO18wiIuj.webp",
    name: "Bệnh viện Bạch Mai Bệnh viện Bạch Mai Bệnh viện Bạch Mai",
    phone: "024(6) 484 875",
  },
  time: "9 : 00",
  date: "02/02/2022",
  patient: {
    name: "Cấn Văn Đạt",
    phone: "0969570400",
    address: "35 Lê Văn Thiêm, P. Thanh Xuân Trung, Q. Thanh Xuân, Hà Nội",
    age: 25,
    gender: "Nam",
  },
  service: [
    {
      stt: 1,
      ten_dich_vu: "Cắt tay",
      chiet_khau: 10,
      gia_kham: 6000,
    },
    {
      stt: 2,
      ten_dich_vu: "Siêu âm Siêu âm ",
      chiet_khau: 20,
      gia_kham: 20000,
    },
    {
      stt: 3,
      ten_dich_vu: "Cắt trĩ",
      chiet_khau: 30,
      gia_kham: 30000,
    },
    {
      stt: 4,
      ten_dich_vu: "Tiêm covid",
      chiet_khau: 40,
      gia_kham: 40000,
    },
  ],
  tong_tien: 10000,
  chiet_khau: 20000,
  phai_thu: 30000,
  thuc_thu: 4000,
  tien_thua: 50000,
};

//

const dataPayment = {
  hospital: {
    avatar:
      "https://printgo.vn/uploads/file-logo/1/x512x512.747d5219a89da42fe2408c84760b2bf3.ai.1.png.pagespeed.ic.onO18wiIuj.webp",
    name: "Bệnh viện Bạch Mai Bệnh viện Bạch Mai Bệnh viện Bạch Mai Bệnh viện Bạch Mai",
    phone: "024(6) 484 875",
  },
  time: "9 : 00",
  date: "02/02/2022",
  don_vi_nhan: "Công ty cổ phần Deepcare Việt Nam",
  nguoi_chi: "Nguyễn Văn BB",
  tien_chi: 3000000,
  ghi_chu:
    "Esse laborum culpa velit nostrud ea magna aliquip irure labore laborum sit nisi voluptate. Minim commodo ullamco do officia culpa reprehenderit irure do ad culpa duis.",
};

const dataPhieuKhamBenh = {
  hospital: {
    avatar:
      "https://printgo.vn/uploads/file-logo/1/x512x512.747d5219a89da42fe2408c84760b2bf3.ai.1.png.pagespeed.ic.onO18wiIuj.webp",
    name: "Bệnh viện Bạch Ma  viện Bạch Ma  viện Bạch Mai",
    phone: "024(6) 484 875",
  },
  ho_ten: "Nguyễn Văn Đức",
  gioi_tinh: "Nam",
  tuoi: 20,
  gio_tiep_nhan: "9:00",
  ngay_tiep_nhan: "20/10/2020",
  khoa_dieu_tri: "Nội tổng hợp",
  stt: 20,
};

const dataBenhAn = {
  hospital: {
    avatar:
      "https://printgo.vn/uploads/file-logo/1/x512x512.747d5219a89da42fe2408c84760b2bf3.ai.1.png.pagespeed.ic.onO18wiIuj.webp",
    name: "Bệnh viện Bạch Mai",
    phone: "024(6) 484 875",
  },
  benh_nhan: {
    ma_benh_nhan: "2343423sdads",
    ma_dinh_danh: "0231244446",
    ho_ten: "Nguyễn Văn Đức",
    gioi_tinh: "Nam",
    ngay_sinh: "20/12/2021",
    so_dien_thoai: "0933221233",
    nhom_mau: "O",
    email: "tét@gmail.com",
    dia_chi: "Số 35 Lê Văn Thiêm",
    quan_huyen: "Thanh Xuân",
    xa_phuong: "Thanh Xuân Trung",
    tinh_thanhpho: "Hà NộiNội",
    dan_toc: "Kinh",
    ton_giao: "Không",
    quoc_tich: "Việt Nam",
    van_hoa: "12/12",
    chung_minh_thu: "1223132421",
    ho_chieu: "23211321321",
    nghe_nghiep: "Bốc Vác",
    noi_cong_tac: "Deepcare",
    bhyt: "2đa222121",
    gia_tri_the_den: "20/12/2021",
    nguoi_lien_he: "Nguyễn Văn B",
    sdt_nguoi_len_he: "0933111111",
    dia_chi_bao_tin: "Số 3 ngõ 9 Nguyễn Huy Tưởng, Thanh Xuân, Hà Nội",
    kham_benh_luc: "09:00 ngày 29/11/2021",
  },
  ly_do_kham:
    "Esse laborum culpa velit nostrud ea magna aliquip irure labore laborum sit nisi voluptate. Minim commodo ullamco do officia culpa reprehenderit irure do ad culpa duis.",
  qua_trinh_benh_ly:
    "Esse laborum culpa velit nostrud ea magna aliquip irure labore laborum sit nisi voluptate. Minim commodo ullamco do officia culpa reprehenderit irure do ad culpa duis.",
  tien_su_benh: {
    tien_su_ban_than:
      "Esse laborum culpa velit nostrud ea magna aliquip irure labore laborum sit nisi voluptate. Minim commodo ullamco do officia culpa reprehenderit irure do ad culpa duis.",
    tien_su_gia_dinh:
      "Esse laborum culpa velit nostrud ea magna aliquip irure labore laborum sit nisi voluptate. Minim commodo ullamco do officia culpa reprehenderit irure do ad culpa duis.",
  },
  kham_benh: {
    kham_toan_than:
      "Esse laborum culpa velit nostrud ea magna aliquip irure labore laborum sit nisi voluptate. Minim commodo ullamco do officia culpa reprehenderit irure do ad culpa duis.",
    kham_bo_phan:
      "Esse laborum culpa velit nostrud ea magna aliquip irure labore laborum sit nisi voluptate. Minim commodo ullamco do officia culpa reprehenderit irure do ad culpa duis.",
    kq_cls:
      "Esse laborum culpa velit nostrud ea magna aliquip irure labore laborum sit nisi voluptate. Minim commodo ullamco do officia culpa reprehenderit irure do ad culpa duis.",
    chuan_doan_benh_chinh: [
      { id: 1, ten_benh: "Bệnh án gì dài vl" },
      { id: 2, ten_benh: "Bệnh án gì dài vl" },
      { id: 3, ten_benh: "Bệnh án gì dài vl" },
      { id: 4, ten_benh: "Bệnh án gì dài vl" },
    ],
    chuan_doan_benh_phu: [
      { id: 1, ten_benh: "Bệnh án gì dài vl" },
      { id: 2, ten_benh: "Bệnh án gì dài vl" },
      { id: 3, ten_benh: "Bệnh án gì dài vl" },
    ],
  },
  chi_so: {
    nhip_tim: 120,
    huyet_ap: 120,
    nhiet_do: 120,
    nhip_tho: 120,
    can_nang: 120,
    chieu_cao: 120,
    sp02: 120,
    bmi: 20,
  },
  ket_qua:
    "Esse laborum culpa velit nostrud ea magna aliquip irure labore laborum sit nisi voluptate. Minim commodo ullamco do officia culpa reprehenderit irure do ad culpa duis. Minim commodo ullamco do officia culpa reprehenderit irure do ad culpa duis.",
};

const dataDonThuoc = {
  hospital: {
    avatar:
      "https://printgo.vn/uploads/file-logo/1/x512x512.747d5219a89da42fe2408c84760b2bf3.ai.1.png.pagespeed.ic.onO18wiIuj.webp",
    name: "Bệnh viện Bạch Mai, ệnh viện Bạch Mai ,ệnh viện Bạch Mai ,ệnh vich Mai ,ệnh vi",
    phone: "024(6) 484 875",
  },
  time: "9 : 00",
  date: "02/02/2022",
  benh_nhan: {
    ma_dinh_danh: "0231244446",
    ho_ten: "Nguyễn Văn Đn",
    gioi_tinh: "Nam",
    tuoi: 20,
    so_dien_thoai: "0933221233",
    dia_chi: "Số 35 Lê Văn Thiêm",
    nguoi_lien_he: "Nguyễn Văn B",
  },
  chuan_doan_benh_chinh: [
    { id: 1, ten_benh: "Bệnh án gì dài vl" },
    { id: 2, ten_benh: "Bệnh án gì dài vl" },
  ],
  chuan_doan_benh_phu: [
    { id: 1, ten_benh: "Bệnh án gì dài vl" },
    { id: 2, ten_benh: "Bệnh án gì dài vl" },
    { id: 3, ten_benh: "Bệnh án gì dài vl" },
  ],
  thuoc: [
    {
      so_dangky: "#2311",
      ten_thuoc: "New Ameflu Multis Multisymptom Mult",
      so_luong: "20 viên",
      thoi_gian_bat_dau: "02/12/2021",
      thoi_gian_ket_thuc: "02/12/2021",
      cach_dung: "Uống",
      lieu_dung: "Sáng 1 ,  Tối: 1 Tối: 1",
      chi_dan:
        "New Ameflu Multisymptom Relief New Ameflu Multisymptom ReliefReliefReliefReliefRelief",
    },
    {
      so_dangky: "#2311",
      ten_thuoc: "New Ameflu Multis Multisymptom Mult",
      so_luong: "20 viên",
      thoi_gian_bat_dau: "02/12/2021",
      thoi_gian_ket_thuc: "02/12/2021",
      cach_dung: "Uống",
      lieu_dung: "Sáng 1 ,  Tối: 1 Tối: 1",
      chi_dan:
        "New Ameflu Multisymptom Relief New Ameflu Multisymptom ReliefReliefReliefReliefRelief",
    },
    {
      so_dangky: "#2311",
      ten_thuoc: "New Ameflu Multisymptom Relief",
      so_luong: "20 viên",
      thoi_gian_bat_dau: "02/12/2021",
      thoi_gian_ket_thuc: "02/12/2021",
      cach_dung: "Uống",
      lieu_dung: "Sáng 1 , Tối: 1",
      chi_dan: "New Ameflu Multisymptom Relief New Ameflu Multisymptom Relief",
    },
    {
      so_dangky: "#2311",
      ten_thuoc: "New Ameflu Multisymptom Relief",
      so_luong: "20 viên",
      thoi_gian_bat_dau: "02/12/2021",
      thoi_gian_ket_thuc: "02/12/2021",
      cach_dung: "Uống",
      lieu_dung: "Sáng 1 , Tối: 1",
      chi_dan: "New Ameflu Multisymptom Relief New Ameflu Multisymptom Relief",
    },
  ],
  ghi_chu:
    "Esse laborum culpa velit nostrud ea magna aliquip irure labore laborum sit nisi voluptate. Minim commodo ullamco do officia culpa reprehenderit irure do ad culpa duis. Minim commodo ullamco do officia culpa reprehenderit irure do ad culpa duis.",
};

donthuoc(dataDonThuoc, "donthuoc.pdf");
donthuoc2(dataDonThuoc, "donthuoc2.pdf");
benhan(dataBenhAn, "benhan.pdf");
phieuKhamBenh(dataPhieuKhamBenh, "phieuKhamBenh.pdf");
createPayments(dataPayment, "phieuchi.pdf");
createReceipts(data, "phieuthu.pdf");

const dataTiepDon = {
  hospital: {
    name: "Bệnh viện Đa khoa HN",
    phone: "024(6) 484 875 - 024(6) 123 456",
  },
  stt: "13",
  ten_phong_kham: "PHÒNG KHÁM PHỤ KHOA - THÁI THỊNH",
  patient: {
    name: "NGUYỄN VĂN A",
    address: "Phường Đức Giang, Q.Long Biên, TP.Hà Nội",
    gender: "Nam",
    yob: "1992",
  },
  bao_hiem: {
    so_the_bhyt: "GD-928-4902500614",
    han_the_den: "01/01/2025",
    doi_tuong: "Bảo hiểm  -80%",
    kham_ngay: "07:51  - 13/01/2022",
  },
};

tiepdon(dataTiepDon, "tiepdon.pdf");
