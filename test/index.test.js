import MarkdownItPluginChain from '../src'

function PluginA () {
  console.log(arguments)
}

function PluginB () {
  console.log(arguments)
}

function PluginC () {
  console.log(arguments)
}

test('options', () => {
  let config = new MarkdownItPluginChain()

  config
    .options
    .set('a', 'alpha')

  config = config.toConfig()
  expect(config.options).toEqual({ a: 'alpha' })
})

test('options - modify', () => {
  let config = new MarkdownItPluginChain()

  config
    .options
    .set('a', 'alpha')

  config
    .options
    .set('a', 'beta')

  config = config.toConfig()
  expect(config.options).toEqual({ a: 'beta' })
})

test('plugin', () => {
  let config = new MarkdownItPluginChain()

  config
    .plugin('A')
    .use(PluginA)

  config
    .plugin('B')
    .use(PluginB)

  config = config.toConfig()
  const pluginFns = config.plugins.map(({ plugin }) => plugin)
  expect(pluginFns).toEqual([PluginA, PluginB])
})

test('plugin - before', () => {
  let config = new MarkdownItPluginChain()

  config
    .plugin('A')
    .use(PluginA)

  config
    .plugin('B')
    .use(PluginB)

  config
    .plugin('C')
    .use(PluginC)
    .before('A')

  config = config.toConfig()
  const pluginFns = config.plugins.map(({ plugin }) => plugin)
  expect(pluginFns).toEqual([PluginC, PluginA, PluginB])
})

test('plugin - after', () => {
  let config = new MarkdownItPluginChain()

  config
    .plugin('A')
    .use(PluginA)

  config
    .plugin('B')
    .use(PluginB)

  config
    .plugin('C')
    .use(PluginC)
    .after('A')

  config = config.toConfig()
  const pluginFns = config.plugins.map(({ plugin }) => plugin)
  expect(pluginFns).toEqual([PluginA, PluginC, PluginB])
})

test('plugin - modify options', () => {
  let config = new MarkdownItPluginChain()
  let optionsA = {}
  let optionsB = {}

  config
    .plugin('A')
    .use(PluginA, [optionsA])

  config
    .plugin('A')
    .use(PluginB, [optionsB])

  config = config.toConfig()
  expect(config.plugins[0].args[0]).toBe(optionsB)
})

test('plugin - modify options', () => {
  let config = new MarkdownItPluginChain()
  let options = { a: 1 }

  config
    .plugin('A')
    .use(PluginA, [options])

  config
    .plugin('A')
    .tap(([opts]) => ([Object.assign(opts, { b: 2 })]))

  config = config.toConfig()
  expect(config.plugins[0].args[0]).toEqual({ a: 1, b: 2 })
})

test('realword example', () => {
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
  expect(md.render('[[TOC]] \n # h1 \n ## h2 \n ## h3 ')).toMatchSnapshot()
})

