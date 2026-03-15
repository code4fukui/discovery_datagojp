# discovery_datagojp

このプロジェクトは、日本の政府の公開データポータル「DATA GO JP」のデータを収集し、整理・分析するためのものです。

## 機能

- DATA GO JPのデータセットを収集し、CSVファイルに変換
- データセットの情報（タイトル、URL、更新日、フォーマットなど）を抽出
- データの分布やヒストグラムを生成

## 必要環境

- Deno
- Node.js (JavaScript処理に使用)

## 使い方

1. リポジトリをクローンする
2. `deno run fetch_ckan.js` を実行してデータセットを収集
3. `deno run make_csv.js` を実行してCSVファイルを生成
4. 生成されたCSVファイルをデータ分析に使用

## データ・API

- [DATA GO JP](https://www.data.go.jp/)

## ライセンス

このプロジェクトは MIT ライセンスの下で公開されています。