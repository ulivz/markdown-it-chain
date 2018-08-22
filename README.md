# markdown-it-chain

> A chaining API like [webpack-chain](https://github.com/neutrinojs/webpack-chain) but for [markdown-it](https://markdown-it.github.io/markdown-it/).

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
// Require the markdown-it-chain module. This module exports a single
// constructor function for creating a configuration API.
const Config = require('markdown-it-chain')

// Instantiate the configuration with a new API
const config = new Config()

// Make configuration changes using the chain API.
// Every API call tracks a change to the stored configuration.
config
  // Interact with 'options' in new MarkdownIt
  // Ref: https://markdown-it.github.io/markdown-it/#MarkdownIt.new
  .options
    .html(true) // equal to .set('html', true)
    .linkify(true)
    .end()

  // Interact with 'plugins'
  .plugin('toc')
    // The first parameter is the plugin module, which may be a function
    // while the second parameter is an array of parameters accepted by the plugin.
    .use(require('markdown-it-table-of-contents'), [{
      includeLevel: [2, 3]
    }])
    // Move up one level, like .end() in jQuery.
    .end()

  .plugin('anchor')
    .use(require('markdown-it-anchor'), [{
      permalink: true,
      permalinkBefore: true,
      permalinkSymbol: '$'
    }])
    // Apply this plugin before toc.
    .before('toc')

// Create a markdown-it instance using the above configuration
const md = config.toMd()
md.render('[[TOC]] \n # h1 \n ## h2 \n ## h3 ')
```

## Advanced

In order to ensure the consistency of the API, `webpack-it-chain` is based on [webpack-chain](https://github.com/neutrinojs/webpack-chain). Here are some things worth reading.

- [ChainedMap](https://github.com/neutrinojs/webpack-chain#chainedmap)
- [Config plugins](https://github.com/neutrinojs/webpack-chain#config-plugins)

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
