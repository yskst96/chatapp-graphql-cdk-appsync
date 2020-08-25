# 概要

cdk,graphql,appsync を使ったチャットアプリ

## バックエンド

- 認証
  Cognito
  未認証ユーザーの場合はなんもできないのでそういう場合は
  認証にIAMを使って、Userプール + IDプールで未認証用ロール使ったりする必要がある。
https://qiita.com/youn4101/items/9bca97083f07d1b9af12
- API
  Appsync

## フロントエンド

vue + amplify で作った

- react 版
  https://github.com/full-stack-serverless/react-chat-app-aws

### メモ
vue3.0のprovide/injectを使って状態管理をしようと思ったが
これらはsetup関数の中でのみ使えるかつasync setupだと機能しないため
APIコールの結果をもとにグロ-バルでreactiveなstateを初期化してprovideする、みたいなことができない...。
現在issueが切られているが特に解決方法が見つかっていないっぽい。
issue⇒ https://github.com/vuejs/vue-next/issues/1409
mountedフックの中でprovideするとか試してみたけど無理だった。

3.0に対応したvue routerの内部でinjectを使っているのでawaitの前に
呼ばないと機能しない。
issue⇒https://github.com/vuejs/vue-router-next/issues/257

Nuxt Pluginのinject/provideなら問題なさそう。か？

## Useful commands

- `npm run build` compile typescript to js
- `npm run watch` watch for changes and compile
- `npm run test` perform the jest unit tests
- `cdk deploy` deploy this stack to your default AWS account/region
- `cdk diff` compare deployed stack with current state
- `cdk synth` emits the synthesized CloudFormation template

# 参考サイト
- 認証ディレクティブ
https://thinkami.hatenablog.com/entry/2019/07/11/235535

- https://dev.to/dabit3/full-stack-serverless-building-a-real-time-chat-app-with-graphql-cdk-appsync-and-react-1dbb?s=09

provide/injectによる状態管理
- https://ushirock.hateblo.jp/entry/2020/05/29/214752
- https://qiita.com/karamage/items/4bc90f637487d3fcecf0