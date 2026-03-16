# discovery_datagojp

> 日本語のREADMEはこちらです: [README.ja.md](README.ja.md)

This project provides a set of scripts to fetch and process open data from the Japanese government's data portal, [data.go.jp](https://www.data.go.jp/data/en/).

## Features
- Fetches dataset metadata and resource information from the CKAN API
- Separates dataset resources by format (e.g., CSV, JSON, XML) into individual files
- Generates a CSV file summarizing all the dataset resources

## Requirements
- [Deno](https://deno.land/) - a modern JavaScript and TypeScript runtime

## Usage
1. Clone the repository:
```
git clone https://github.com/username/discovery_datagojp.git
```
2. Change to the project directory:
```
cd discovery_datagojp
```
3. Run the data fetching and processing scripts:
```
deno run --allow-net --allow-read --allow-write fetch_ckan.js
deno run --allow-read --allow-write make_csv.js
```
This will download the dataset metadata, separate the resources by format, and generate a CSV file with a summary of all the resources.

## Data / API
This project uses the [data.go.jp CKAN API](https://www.data.go.jp/data/en/api/) to fetch open data from the Japanese government's data portal.

## License
MIT License — see [LICENSE](LICENSE).