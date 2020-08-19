#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from '@aws-cdk/core';
import { ChatappGraphqlCdkAppsyncStack } from '../lib/chatapp-graphql-cdk-appsync-stack';

const app = new cdk.App();
new ChatappGraphqlCdkAppsyncStack(app, 'ChatappGraphqlCdkAppsyncStack');
