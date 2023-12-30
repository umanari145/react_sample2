# react_sample2


## install & start

```
docker exec -it r_s_node sh
pwd /app
# プロジェクトの作成
npx create-react-app front --template typescript
frontディレクトリ以下にプロジェクト作られる
cd front
npm start ここでホットリロードができる

http://localhost:3000/ でアクセスできる
```

## ファイル構成
- front
  - public 公開ファイル
  - src 
    - class クラスファイル
    - libs ライブラリ系のファイル パーツ系の部分
    - pages routerでアクセスされる１ページ１ページ
      - Basic.tsx 基本構文など
      - Todo.tsx 
      - MultiPulldown.tsx よくある二重プルダウンかつ動的追加系
      - Price.tsx 動的な金額系のアプリ
      - Markdown.tsx マークダウンエディタ (参考 React × TypeScript で手を動かながら学ぶ！モダンなフロントエンド開発入門 https://www.techpit.jp/courses/111 ) 
    - App.tsx Reactのapp部分
    - index.tsx エントリーポイント

