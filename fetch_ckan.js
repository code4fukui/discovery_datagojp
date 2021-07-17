//import { fetchJSON } from "https://js.sabae.cc/fetchJSON.js";
import { fetchJSONCurl as fetchJSON } from "https://js.sabae.cc/fetchCurl.js";

const existsFile = async (fn) => {
  try {
    const s = await Deno.readFile(fn);
    //console.log(s.length);
    return true;
  } catch (e) {
    //console.log(e);
  }
  return false;
};

const fetchList = async (endpoint, name) => {
  const list = await fetchJSON(endpoint + "action/package_list");
  //const list = JSON.parse(await Deno.readTextFile("temp/package_list"));
  console.log(list);
  const base = "data/" + name;
  await Deno.mkdir(base, { recursive: true });
  await Deno.writeTextFile(base + ".json", JSON.stringify(list.result));
  for (const d of list.result) {
    const fn = base + "/" + d + ".json";
    if (await existsFile(fn)) {
      console.log(d + " skipped");
      continue;
    }
    console.log(d + " downloading");
    const url = endpoint + "action/package_show?id=" + d;
    //const data = JSON.parse(await (await fetch(url)).text());
    console.log(url);

    const data = await fetchJSON(url);
    console.log(data);
    await Deno.writeTextFile(fn, JSON.stringify(data.result));
  }
  console.log(list.result.length); // 27526
};

const fetchResource = async (endpoint, name) => {
  const limit = 1000; // 最大1000
  const page = 0;
  const list = await fetchJSON(endpoint + `action/current_package_list_with_resources?limit=${limit}&page=${page}`);
  console.log(list, list.result.length);
  // todo
};

/*
    {
      user_id: "29d7a5c0-6790-438c-93c0-657db4eb1d1c",
      timestamp: "2021-07-05T08:09:45.984459",
      object_id: "58ca1c76-dc07-404b-a5d5-0d7f7cfaba36",
      revision_id: "ffa6ab58-ee8a-4761-aaf4-10af1dfdbd5f",
      data: { package: [Object] },
      id: "dc583c6b-c7c3-49b9-86d0-ff1b5a3ebad2",
      activity_type: "changed package"
    },
    {
      user_id: "29d7a5c0-6790-438c-93c0-657db4eb1d1c",
      timestamp: "2021-07-05T08:09:44.831217",
      object_id: "416617b5-414e-44f4-a0e5-39130c964bae",
      revision_id: "d6915703-4fe0-472d-aeac-3dbf17987c08",
      data: { package: [Object] },
      id: "d811c072-abcc-4239-8e9a-3303fbdd87ed",
      activity_type: "changed package"
    },
*/
const fetchRecently = async (ckan) => {
  const limit = 1000; // 最大1000
  const offset = 0;
  const list = await fetchJSON(ckan.endpoint + `action/recently_changed_packages_activity_list?limit=${limit}&offset=${offset}`);
  console.log(list, list.result.length);
  console.log(JSON.stringify(list, null, 2));
  // todo
  // object_id
};

const ckan = [
  //{ name: "odp", endpoint: "https://ckan.odp.jig.jp/api/3/" },
  { name: "data_go_jp", endpoint: "https://www.data.go.jp/data/api/" },
];

for (const c of ckan) {
  //fetchList(c.endpoint, c.name);
  //fetchResource(c.endpoint, c.name);
  fetchRecently(c);
}

/*
const url = "https://ckan.odp.jig.jp/api/3/action/package_show?id=jp-fukui-fukui-481-odp";
const data = JSON.parse(await (await fetch(url)).text());
console.log(data);
*/
