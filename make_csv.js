import { CSV } from "https://js.sabae.cc/CSV.js";
import { Histograms } from "https://js.sabae.cc/Histograms.js";
import { ArrayUtil } from "https://js.sabae.cc/ArrayUtil.js";

const readJSON = async (fn) => {
  try {
    return JSON.parse(await Deno.readTextFile(fn));
  } catch (e) {
    return null;
  }
};

const makeCSV = async (name, baseurl) => {
  const path = "data/" + name;
  const list = JSON.parse(await Deno.readTextFile(path + ".json"));
  const data = [];
  const sets = new Histograms();
  for (const id of list) {
    const d = await readJSON(path + "/" + id + ".json");
    if (d == null)
      break;
    //console.log(d);

    const dataset = {
      url: baseurl + id,
      //url: "d.html?" + id,
      title: d.title,
      date: d.revision_timestamp || d.metadata_created,
      groups: d.groups.map(g => g.display_name).join(";"),
      tags: d.tags.map(t => t.name).join(";"),
      format: ArrayUtil.toUnique(d.resources.map(r => r.format)).join(";"),
      //license: d.license_id,
      organization: d.organization.title,
      //description: d.notes,
    };
    for (const r of d.resources) {
      const res = {
        ckanurl: "https://www.data.go.jp/data/dataset/" + id + "/resource/" + r.id,
        url: r.url,
        licence: r.resource_license_id,
        title: dataset.title,
        res_title: r.name,
        description: r.description,
        format: r.format,
        created: r.created,
        tags: dataset.tags,
        groups: dataset.groups,
        organization: dataset.organization,
      };
      
      for (const tag of d.tags) {
        sets.add("tag", tag.name);
      }
      for (const grp of d.groups) {
        sets.add("group", grp.display_name);
      }
      sets.add("licence", res.licence);
      sets.add("format", r.format);
      sets.add("language", r.language);
      //console.log(r);
      // jtd: 一太郎, 1file
      // KML: 117 map用
      // KMZ: 202 KMLのzip圧縮 doc.kml
      // php -> HTMLのまちがい?、しかもリンク切れ
      // jsp -> 検索システム
      // EXE: Excelの間違い
      // PNG: HTMLの間違い https://www.river.go.jp/kawabou/pc/tm?zm=15&clat=36.00784624811246&clon=136.08936309814456&fld=0&mapType=0&viewGrpStg=0&viewRd=1&viewRW=1&viewRiver=1&viewPoint=1&ofcCd=4609&itmkndCd=7&obsCd=11
      // lzh
      // asx: 動画
      // ODT: pdfのまちがい
      //if (res.format == "ODT") {
      if (true) {
        data.push(res);
      }
    }
  }
  //console.log(data);
  //console.log(sets.toString());
  await sets.saveAsCSV("data/" + name + "_");
  await Deno.writeTextFile(path + ".csv", CSV.encode(CSV.fromJSON(data)));
  console.log(data.length);
};

const ckan = [
  //{ name: "odp", endpoint: "https://ckan.odp.jig.jp/api/3/", baseurl: "https://ckan.odp.jig.jp/dataset/" },
  { name: "data_go_jp", endpoint: "https://www.data.go.jp/data/api/", baseurl: "https://www.data.go.jp/data/dataset/" },
];

for (const c of ckan) {
  await makeCSV(c.name, c.baseurl);
}

/*
format
XLS: 126601
HTML: 99419
PDF: 66740
CSV: 28057
XLSX: 15079
ZIP: 3563
: 2798
XML: 1773
GIF: 1750
JPEG: 986
TXT: 284
PNG: 237
KMZ: 202
PPTX: 118
KML: 117
DOC: 112
EXE: 109
mp3: 92
epub: 82
DOCX: 51
PPT: 15
SHP: 15
lzh: 14
jtd: 10
asx: 9
php: 8
jsp: 1
ODT: 1
*/