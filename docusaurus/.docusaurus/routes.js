import React from 'react';
import ComponentCreator from '@docusaurus/ComponentCreator';

export default [
  {
    path: '/__docusaurus/debug',
    component: ComponentCreator('/__docusaurus/debug', 'f17'),
    exact: true
  },
  {
    path: '/__docusaurus/debug/config',
    component: ComponentCreator('/__docusaurus/debug/config', '9a0'),
    exact: true
  },
  {
    path: '/__docusaurus/debug/content',
    component: ComponentCreator('/__docusaurus/debug/content', '6a8'),
    exact: true
  },
  {
    path: '/__docusaurus/debug/globalData',
    component: ComponentCreator('/__docusaurus/debug/globalData', 'e1a'),
    exact: true
  },
  {
    path: '/__docusaurus/debug/metadata',
    component: ComponentCreator('/__docusaurus/debug/metadata', '877'),
    exact: true
  },
  {
    path: '/__docusaurus/debug/registry',
    component: ComponentCreator('/__docusaurus/debug/registry', '532'),
    exact: true
  },
  {
    path: '/__docusaurus/debug/routes',
    component: ComponentCreator('/__docusaurus/debug/routes', '81a'),
    exact: true
  },
  {
    path: '/markdown-page',
    component: ComponentCreator('/markdown-page', '676'),
    exact: true
  },
  {
    path: '/docs',
    component: ComponentCreator('/docs', 'a9e'),
    routes: [
      {
        path: '/docs/',
        component: ComponentCreator('/docs/', 'a8c'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/docs/category/concepts',
        component: ComponentCreator('/docs/category/concepts', 'ab6'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/docs/category/cosmwasm',
        component: ComponentCreator('/docs/category/cosmwasm', 'cfe'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/docs/category/dev-environment',
        component: ComponentCreator('/docs/category/dev-environment', '0ff'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/docs/category/evm',
        component: ComponentCreator('/docs/category/evm', '9cd'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/docs/category/ibc',
        component: ComponentCreator('/docs/category/ibc', '9a9'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/docs/category/ibctl-cli-tool',
        component: ComponentCreator('/docs/category/ibctl-cli-tool', 'a25'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/docs/category/polymer-protocol',
        component: ComponentCreator('/docs/category/polymer-protocol', 'a2a'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/docs/category/quickstart-tutorials',
        component: ComponentCreator('/docs/category/quickstart-tutorials', '4da'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/docs/concepts/IBC/',
        component: ComponentCreator('/docs/concepts/IBC/', '7fa'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/docs/concepts/polymer/',
        component: ComponentCreator('/docs/concepts/polymer/', 'ab4'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/docs/concepts/polymer/ibc-expansion-problem',
        component: ComponentCreator('/docs/concepts/polymer/ibc-expansion-problem', '8e1'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/docs/concepts/polymer/multi-hop',
        component: ComponentCreator('/docs/concepts/polymer/multi-hop', '8e7'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/docs/concepts/polymer/native-virtual-clients',
        component: ComponentCreator('/docs/concepts/polymer/native-virtual-clients', '966'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/docs/concepts/polymer/summary',
        component: ComponentCreator('/docs/concepts/polymer/summary', 'f27'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/docs/concepts/polymer/vibc',
        component: ComponentCreator('/docs/concepts/polymer/vibc', '0a4'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/docs/concepts/polymer/zkmint',
        component: ComponentCreator('/docs/concepts/polymer/zkmint', 'c8b'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/docs/dev-environment/',
        component: ComponentCreator('/docs/dev-environment/', '2dc'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/docs/dev-environment/CosmWasm/',
        component: ComponentCreator('/docs/dev-environment/CosmWasm/', '3dc'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/docs/dev-environment/CosmWasm/ibc-cw',
        component: ComponentCreator('/docs/dev-environment/CosmWasm/ibc-cw', 'd75'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/docs/dev-environment/CosmWasm/interact',
        component: ComponentCreator('/docs/dev-environment/CosmWasm/interact', '983'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/docs/dev-environment/EVM/',
        component: ComponentCreator('/docs/dev-environment/EVM/', '06f'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/docs/dev-environment/EVM/ibc-sol',
        component: ComponentCreator('/docs/dev-environment/EVM/ibc-sol', 'f87'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/docs/dev-environment/EVM/interact',
        component: ComponentCreator('/docs/dev-environment/EVM/interact', '42f'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/docs/ibctl/',
        component: ComponentCreator('/docs/ibctl/', 'f16'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/docs/ibctl/config',
        component: ComponentCreator('/docs/ibctl/config', 'cd5'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/docs/ibctl/docker',
        component: ComponentCreator('/docs/ibctl/docker', '2c9'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/docs/ibctl/metrics',
        component: ComponentCreator('/docs/ibctl/metrics', 'fe0'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/docs/ibctl/query',
        component: ComponentCreator('/docs/ibctl/query', '58e'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/docs/ibctl/setup',
        component: ComponentCreator('/docs/ibctl/setup', '17d'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/docs/ibctl/tx',
        component: ComponentCreator('/docs/ibctl/tx', '681'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/docs/quickstart/',
        component: ComponentCreator('/docs/quickstart/', '773'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/docs/quickstart/quickstart-1',
        component: ComponentCreator('/docs/quickstart/quickstart-1', '23a'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/docs/quickstart/quickstart-2',
        component: ComponentCreator('/docs/quickstart/quickstart-2', '5eb'),
        exact: true,
        sidebar: "tutorialSidebar"
      }
    ]
  },
  {
    path: '/',
    component: ComponentCreator('/', '6a6'),
    exact: true
  },
  {
    path: '*',
    component: ComponentCreator('*'),
  },
];
