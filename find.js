import { ArrayUtil } from "https://js.sabae.cc/ArrayUtil.js";

const readJSON = async (fn) => {
  try {
    return JSON.parse(await Deno.readTextFile(fn));
  } catch (e) {
    return null;
  }
};

const find = async (ckan) => {
  const path = "data/" + ckan.name;
  const list = JSON.parse(await Deno.readTextFile(path + ".json"));
  for (const id of list) {
    const d = await readJSON(path + "/" + id + ".json");
    if (d == null)
      break;
    //console.log(d);

    const dataset = {
      url: ckan.baseurl + id,
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
    if (d.id == "be662d23-cfeb-47f0-9a47-6525272e78dd") {
      console.log(dataset);
      break;
    }
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
      
    }
  }
};

const ckan = [
  //{ name: "odp", endpoint: "https://ckan.odp.jig.jp/api/3/", baseurl: "https://ckan.odp.jig.jp/dataset/" },
  { name: "data_go_jp", endpoint: "https://www.data.go.jp/data/api/", baseurl: "https://www.data.go.jp/data/dataset/" },
];

for (const c of ckan) {
  await find(c);
}
