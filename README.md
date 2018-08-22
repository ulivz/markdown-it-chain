# markdown-it-chain

> Use a chaining API like [webpack-chain](https://github.com/neutrinojs/webpack-chain) but for [markdown-it](https://markdown-it.github.io/markdown-it/).

[![NPM version](https://img.shields.io/npm/v/markdown-it-chain.svg?style=flat)](https://npmjs.com/package/markdown-it-chain) [![NPM downloads](https://img.shields.io/npm/dm/markdown-it-chain.svg?style=flat)](https://npmjs.com/package/markdown-it-chain) [![CircleCI](https://circleci.com/gh/ULIVZ/markdown-it-chain/tree/master.svg?style=shield)](https://circleci.com/gh/ULIVZ/markdown-it-chain/tree/master)  [![donate](https://img.shields.io/badge/$-donate-ff69b4.svg?maxAge=2592000&style=flat)](https://github.com/ULIVZ/donate)

## Install

**Yarn**

```bash
yarn add -dev markdown-it-chain
```

**npm**

```bash
npm install --save-dev markdown-it-chain
```

## Getting Started

```js
const Config = require('markdown-it-chain')

const config = new Config()
config
  .options
    .set('html', true)
    .set('linkify', true)
    .end()
  .plugin('toc')
    .use(tocPlugin, [{
      includeLevel: [2, 3]
    }])
    .end()
  .plugin('anchor')
    .use(anchorPlugin, [{
      permalink: true,
      permalinkBefore: true,
      permalinkSymbol: '#'
    }])

const md = config.toMd()
md.render('# App')
```

## Contributing

1. Fork it!
2. Create your feature branch: `git checkout -b my-new-feature`
3. Commit your changes: `git commit -am 'Add some feature'`
4. Push to the branch: `git push origin my-new-feature`
5. Submit a pull request :D


## Author

**markdown-it-chain** © [ULIVZ](https://github.com/ULIVZ), Released under the [MIT](./LICENSE) License.<br>
Authored and maintained by ULIVZ with help from contributors ([list](https://github.com/ULIVZ/markdown-it-chain/contributors)).

> [github.com/ULIVZ](https://github.com/ULIVZ) · GitHub [@ULIVZ](https://github.com/ULIVZ) · Twitter [@_ulivz](https://twitter.com/_ulivz)
