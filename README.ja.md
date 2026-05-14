# discovery_datagojp

日本の公式オープンデータポータル [data.go.jp](https://www.data.go.jp/data/en/) からオープンデータを取得、処理、分析するためのDenoスクリプト群です。

## 機能

- **すべてのメタデータの取得**: data.go.jpのCKAN APIからデータセットの完全なリストと詳細なメタデータをローカルキャッシュにダウンロードします。
- **マスターCSVの生成**: 個々のデータリソースとそれに関連するメタデータ（タイトル、フォーマット、URL、組織など）を網羅した `data_go_jp.csv` ファイルを作成します。
- **データ概要の生成**: 利用可能なデータの全体像を把握するため、いくつかのヒストグラムCSV（例: タグ別、フォーマット別、ライセンス別）を生成します。
- **ユーティリティスクリプト**: 分析を容易にするため、マスターCSVをデータフォーマット別に分割する追加ツールが含まれています。

## 生成されるファイル

スクリプトの実行後、`data/` ディレクトリには以下のファイルが生成されます:

- `data/data_go_jp/`: 各データセットの固有IDをファイル名とした個別のJSONファイルが格納されるディレクトリ。
- `data/data_go_jp.json`: すべてのデータセットIDのシンプルなリストを含むJSONファイル。
- `data/data_go_jp.csv`: メインの出力ファイル。ポータル上で利用可能なすべてのデータリソースをまとめたCSVです。
- `data/data_go_jp_*.csv`: さまざまなカテゴリ（例: `data_go_jp_tag.csv`、`data_go_jp_format.csv`）ごとの件数をまとめた概要ファイル群。

## 必要条件

- [Deno](https://deno.land/) - モダンなJavaScriptおよびTypeScriptランタイム。

## 使い方

1.  **リポジトリをクローンする:**
    ```bash
    git clone https://github.com/username/discovery_datagojp.git
    cd discovery_datagojp
    ```

2.  **すべてのデータセットのメタデータを取得する:**
    このスクリプトは、すべてのデータセットのリストをダウンロードした後、各データセットの詳細なJSONメタデータを取得し、`data/data_go_jp/` ディレクトリに保存します。
    ```bash
    deno run --allow-net --allow-read --allow-write fetch_ckan.js
    ```

3.  **メタデータを処理してCSVを生成する:**
    このスクリプトは、ダウンロードしたJSONファイルを読み込み、メインの概要ファイルである `data_go_jp.csv` と、いくつかのヒストグラムファイル（例: `data_go_jp_tag.csv`）を生成します。
    ```bash
    deno run --allow-read --allow-write make_csv.js
    ```

### 追加スクリプト

**リソースをフォーマット別に分割**

`data_go_jp.csv` を生成した後、このスクリプトを実行することで、ファイルフォーマットごとに複数のCSV（例: `data_go_jp_format_CSV.csv`、`data_go_jp_format_XLS.csv`）に分割できます。

```bash
deno run --allow-read --allow-write separate_by_format.js
```

## データソース

このプロジェクトは、日本政府のデータポータルからオープンデータを取得するために [data.go.jp CKAN API](https://www.data.go.jp/data/en/api/) を使用しています。

## ライセンス

MIT License — 詳細は [LICENSE](LICENSE) を参照してください。
