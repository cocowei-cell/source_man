/**
 * @description: 表格导出功能
 * @param {$el, fileName}
 * @return {Blob}
 */
// 导入表格导出为Excel模块
import FileSaver from "file-saver";
import XLSX from "xlsx";
function exportExcel($el, fileName) {
  var xlsxParam = { raw: true }; // 导出的内容只做解析，不进行格式转换
  var table = $el.cloneNode(true);
  var wb = XLSX.utils.table_to_book(table, xlsxParam);
  var wbout = XLSX.write(wb, {
    bookType: "xlsx",
    bookSST: true,
    type: "array",
  });
  try {
    FileSaver.saveAs(
      new Blob([wbout], { type: "application/octet-stream" }),
      `${fileName}.xlsx`
    );
  } catch (e) {
    if (typeof console !== "undefined") {
      console.log(e, wbout);
    }
  }
  return wbout;
}

export default exportExcel;
