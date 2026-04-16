/**
 * Google Apps Script — приём данных предоценки из лендинга (вариант 7257-5).
 * Запись в таблицу — только при нажатии «Оставить заявку» (есть валидные проба и масса).
 *
 * 1. Создайте таблицу Google Sheets, в первой строке заголовки: время | проба | масса | оценка
 * 2. Вставьте ниже ID таблицы (из URL: https://docs.google.com/spreadsheets/d/ID/edit)
 * 3. В редакторе Apps Script вставьте этот код, «Развернуть» → «Новое развертывание» → тип «Веб-приложение»
 *    — выполнять от имени: я
 *    — у кого есть доступ: все (в т.ч. анонимные), иначе fetch с сайта не дойдёт
 * 4. Скопируйте URL веб-приложения (…/exec) в main.js → константа PRECALC_SCRIPT_URL
 */

const PRECALC_SHEET_ID = '1KmoT1ziqFkNX-lVXIMcFJpFcG-N5cCj0F4tce5A2XOE';

function doGet(e) {
  const p = e.parameter || {};
  const time = p.time || new Date().toISOString();
  const prob = p.prob != null ? String(p.prob) : '';
  const grams = p.grams != null ? String(p.grams) : '';
  const estimate = p.estimate != null ? String(p.estimate) : '';

  try {
    const sheet = SpreadsheetApp.openById(PRECALC_SHEET_ID).getSheets()[0];
    sheet.appendRow([time, prob, grams, estimate]);
  } catch (err) {
    return ContentService.createTextOutput(
      JSON.stringify({ ok: false, error: String(err) })
    ).setMimeType(ContentService.MimeType.JSON);
  }

  return ContentService.createTextOutput(JSON.stringify({ ok: true })).setMimeType(
    ContentService.MimeType.JSON
  );
}
