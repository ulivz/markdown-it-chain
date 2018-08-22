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



