import { CSVReader } from "./CSVReader.js";
import { CSVWriter } from "./CSVWriter.js";

const r = new CSVReader("data/data_go_jp.csv");
const head = await r.readRecord();
let cnt = 0;
const writers = {};
for (;;) {
  const a = await r.readRecord(head);
  console.log(a);
  if (!a) {
    break;
  }
  let w = writers[a.format];
  if (!w) {
    w = new CSVWriter("data/data_go_jp_format_" + a.format + ".csv");
    await w.writeRecord(head);
    writers[a.format] = w;    
  }
  await w.writeRecord(a, head);
  cnt++;
}
console.log(cnt);

