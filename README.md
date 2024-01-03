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

- bin サーバー
- front

  - public 公開ファイル
  - src
    - class クラスファイル
    - libs ライブラリ系のファイル パーツ系の部分
    - pages router でアクセスされる１ページ１ページ
      - Basic.tsx 基本構文など
      - Todo.tsx
      - MultiPulldown.tsx よくある二重プルダウンかつ動的追加系
      - Price.tsx 動的な金額系のアプリ
      - Markdown.tsx マークダウンエディタ (参考 React × TypeScript で手を動かながら学ぶ！モダンなフロントエンド開発入門 https://www.techpit.jp/courses/111 )
      - Youtube 【React + Atomic Design】作りながら学ぶ！コンポーネント指向開発[https://www.techpit.jp/courses/109/]
    - App.tsx React の app 部分
    - index.tsx エントリーポイント

- routes API のルーティング
- app.js express のエントリーポイント

## IndexedDB について

https://zenn.dev/awyaki/scraps/06a41ea81f55cf

https://qiita.com/yamayamasan/items/a4297e724b86f4a00fd2

## StoryBook について

https://zenn.dev/em0/scraps/ef0bb0b6def951

インストール時

```
cd /app/front
npx sb init
```

起動

```
npm run storybook
```

## HooksAPI(useXXX 系) について

React の状態管理の全体像を学ぼう[https://www.techpit.jp/courses/276]

useState

```
const [count, setCount] = useState(0)
// 以下のような書き方でも可能
const state = useState(0)
const count = state[0] // 1 番最初の要素
const setCount = state[1] // 2 番目の要素


const [count, setCount] = useState(0)

// 省略

const onClick = () => {
  console.log(count) // => 1
  const newCount = count + 1
  setCount(newCount)
  console.log(count) // => 1 (2ではない）
}

// 1 onClickが終わる
// 2 Reactが変更を検知し、レンダリングが行われる
// 3 countが次の値に変わる
```

## AtomicDesign について

【React + Atomic Design】作りながら学ぶ！コンポーネント指向開発[https://www.techpit.jp/courses/109/]

Atoms

- Typography 文字列表示
- Input テキスト入力
- Button ボタン
- Image 画像
- Spinner スピナー

Organisms

- Header ヘッダ
- SearchForm 検索フォーム
- VideosListItem 動画リストアイテム
- VideosList 動画リスト

Templates

- VideosListTemplates 動画一覧で使うテンプレート

Pages

- TopPage トップページ

## express のインストール

https://ichi-bit.hateblo.jp/entry/2017/11/23/create-react-app%E3%81%AE%E3%82%A2%E3%83%97%E3%83%AA%E3%82%92Express%E5%86%85%E3%81%A7%E9%85%8D%E7%BD%AE%E3%80%81%E9%85%8D%E4%BF%A1%E3%81%99%E3%82%8B

```
npm install -g express-generator

express app
app/直下にファイルがはかれるので、上に移動
```

## express &react 同時に起動

https://qiita.com/fe_js_engineer/items/b052918f64b2df554d0f

```

```
