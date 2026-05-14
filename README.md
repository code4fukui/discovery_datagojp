# discovery_datagojp

> 日本語のREADMEはこちらです: [README.ja.md](README.ja.md)

A set of Deno scripts to fetch, process, and analyze open data from Japan's official open data portal, [data.go.jp](https://www.data.go.jp/data/en/).

## Features

- **Fetch All Metadata**: Downloads the complete list of datasets and their detailed metadata from the data.go.jp CKAN API into a local cache.
- **Generate Master CSV**: Creates a comprehensive `data_go_jp.csv` file, listing every individual data resource with its associated metadata (title, format, URL, organization, etc.).
- **Create Data Summaries**: Generates several histogram CSVs (e.g., by tag, format, license) to provide a high-level overview of the available data.
- **Utility Scripts**: Includes additional tools to separate the master CSV by data format for easier analysis.

## Generated Files

After running the scripts, the `data/` directory will be populated with the following:

- `data/data_go_jp/`: A directory containing individual JSON files for each dataset, named by their unique ID.
- `data/data_go_jp.json`: A JSON file containing a simple list of all dataset IDs.
- `data/data_go_jp.csv`: The main output file. A CSV summarizing every data resource available on the portal.
- `data/data_go_jp_*.csv`: A set of summary files providing counts for different categories (e.g., `data_go_jp_tag.csv`, `data_go_jp_format.csv`).

## Requirements

- [Deno](https://deno.land/) - A modern JavaScript and TypeScript runtime.

## Usage

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/username/discovery_datagojp.git
    cd discovery_datagojp
    ```

2.  **Fetch all dataset metadata:**
    This script downloads the list of all datasets and then fetches the detailed JSON metadata for each one, saving them into the `data/data_go_jp/` directory.
    ```bash
    deno run --allow-net --allow-read --allow-write fetch_ckan.js
    ```

3.  **Process metadata and generate CSVs:**
    This script reads the downloaded JSON files and generates the main `data_go_jp.csv` summary file, along with several histogram files (e.g., `data_go_jp_tag.csv`).
    ```bash
    deno run --allow-read --allow-write make_csv.js
    ```

### Additional Scripts

**Separate Resources by Format**

After generating `data_go_jp.csv`, you can run this script to split it into multiple CSVs, one for each file format (e.g., `data_go_jp_format_CSV.csv`, `data_go_jp_format_XLS.csv`).

```bash
deno run --allow-read --allow-write separate_by_format.js
```

## Data Source

This project uses the [data.go.jp CKAN API](https://www.data.go.jp/data/en/api/) to fetch open data from the Japanese government's data portal.

## License

MIT License — see [LICENSE](LICENSE).