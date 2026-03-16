# discovery_datagojp

このプロジェクトは、日本政府の公開データポータル「DATA GO JP」からデータを収集し、整理・分析するためのものです。

## 機能

- DATA GO JPのデータセットのメタデータと資源情報を CKAN API から取得
- データセットの資源をフォーマット別(CSV、JSON、XML など)に個別のファイルに分離
- データセットの資源情報をまとめたCSVファイルを生成

## 必要環境

- [Deno](https://deno.land/) - 現代的な JavaScript/TypeScriptランタイム

## 使い方

1. リポジトリをクローンする:
```
git clone https://github.com/username/discovery_datagojp.git
```
2. プロジェクトディレクトリに移動する:
```
cd discovery_datagojp
```
3. データ取得・処理スクリプトを実行する:
```
deno run --allow-net --allow-read --allow-write fetch_ckan.js
deno run --allow-read --allow-write make_csv.js
```
これにより、データセットのメタデータがダウンロードされ、フォーマット別に分離され、リソース情報をまとめたCSVファイルが生成されます。

## データ・API

このプロジェクトでは[DATA GO JP CKAN API](https://www.data.go.jp/data/en/api/)を使用して、日本政府の公開データポータルからデータを取得しています。

## ライセンス

このプロジェクトは [MIT ライセンス](LICENSE)の下で公開されています。