const qs = require("qs");
const crypto = require("crypto");

const vnp_TmnCode = "5LGCD8DO";
const vnp_HashSecret = "E90OIKOYH2E5UC5XS2ZDOS0F9B1KMY13";
const vnp_Url = "https://sandbox.vnpayment.vn/paymentv2/vpcpay.html";
const vnp_ReturnUrl = "http://localhost:3000/vnpay_return";

module.exports = {
  createPayment: (req, res) => {
    const ipAddr =
      req.headers["x-forwarded-for"] || req.connection.remoteAddress;
    const tmnCode = vnp_TmnCode;
    const secretKey = vnp_HashSecret;
    const vnpUrl = vnp_Url;
    const returnUrl = vnp_ReturnUrl;

    const date = new Date();
    const createDate = date
      .toISOString()
      .replace(/[-:TZ.]/g, "")
      .slice(0, 14);

    const orderId = Date.now();
    const amount = req.body.amount * 100; // VNPay yêu cầu đơn vị là VND * 100

    let vnp_Params = {
      vnp_Version: "2.1.0",
      vnp_Command: "pay",
      vnp_TmnCode: tmnCode,
      vnp_Locale: "vn",
      vnp_CurrCode: "VND",
      vnp_TxnRef: orderId,
      vnp_OrderInfo: "Thanh toan don hang " + orderId,
      vnp_OrderType: "other",
      vnp_Amount: amount,
      vnp_ReturnUrl: returnUrl,
      vnp_IpAddr: ipAddr,
      vnp_CreateDate: createDate,
    };

    vnp_Params = sortObject(vnp_Params);

    const signData = qs.stringify(vnp_Params, { encode: false });
    const hmac = crypto.createHmac("sha512", secretKey);
    const signed = hmac.update(Buffer.from(signData, "utf-8")).digest("hex");
    vnp_Params["vnp_SecureHash"] = signed;

    const paymentUrl =
      vnpUrl + "?" + qs.stringify(vnp_Params, { encode: false });
    res.redirect(paymentUrl);
  },

  vnpayReturn: (req, res) => {
    // Xử lý kết quả thanh toán ở đây
    res.render("vnpay-result", { vnp_Params: req.query });
  },
};

function sortObject(obj) {
  const sorted = {};
  const keys = Object.keys(obj).sort();
  for (let key of keys) {
    sorted[key] = obj[key];
  }
  return sorted;
}
