# 概要

cdk,graphql,appsync を使ったチャットアプリ

##　バックエンド

- 認証
  Cognito

- API
  Appsync

## フロントエンド

vue + amplify で作った

- react 版
  https://github.com/full-stack-serverless/react-chat-app-aws

## Useful commands

- `npm run build` compile typescript to js
- `npm run watch` watch for changes and compile
- `npm run test` perform the jest unit tests
- `cdk deploy` deploy this stack to your default AWS account/region
- `cdk diff` compare deployed stack with current state
- `cdk synth` emits the synthesized CloudFormation template

# 参考サイト

- https://dev.to/dabit3/full-stack-serverless-building-a-real-time-chat-app-with-graphql-cdk-appsync-and-react-1dbb?s=09
