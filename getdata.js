const fs = require("fs");
const path = require("path");
var stripBom = require("strip-bom");
const log = require("./function/log.js");
var originaldata = {}

function getDT(){
	if (fs.existsSync("./data.json")) {
        console.log('Đã Nhận Data!');
        try{
        	            var rt = JSON.parse(stripBom(fs.readFileSync(path.join(__dirname, "data.json"), {encoding: "utf8"})));
            return rt;
        } catch (err){
            console.error(err);
            console.error("Không thể đọc dữ liệu File Data! Bot đi ngủ Đông đây😅...");
            process.exit(101);
        }
    } else if (!fs.existsSync("./data.json")) {
        log.err('Chưa Tìm Thấy Data!')
        log.loaded('Khởi tạo Data File...');
        try{
            fs.writeFileSync(path.join(__dirname, "data.json"), JSON.stringify(originaldata, null, 4)); 
            log.loaded('Tạo File Data Thành Công!')
        } catch (_) {
            log.err("Lỗi Khi Tạo Data!");
        }
        try{
            var rt = JSON.parse(stripBom(fs.readFileSync(path.join(__dirname, "data.json"), {encoding: "utf8"})));
            return rt;
        } catch (err){
            console.error(err);
            console.error("Không thể đọc dữ liệu File Data! Bot đi ngủ đông đây😅..");
            process.exit(101);
        }
    }
}

module.exports = getDT;