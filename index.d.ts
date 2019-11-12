import { ChainedMap } from 'webpack-chain'
import MarkdownItConstructor, { MarkdownIt, Options } from 'markdown-it'

interface Plugin {
  <T>(md: MarkdownIt, options: T): void
}

interface PluginChain<T = any> extends ChainedMap<MarkdownChain> {
  use<V = T>(plugin: Plugin<V>, args?: [V]): PluginChain<V>
  tap(fn: (args: [T]) => [T]): PluginChain<T>
  merge(
    obj: Partial<{ plugin: Plugin<T>; args: [T] }>,
    omit?: string[]
  ): PluginChain<T>
}

interface OptionsChain extends ChainedMap<MarkdownChain> {
  html(value: boolean): OptionsChain
  xhtmlOut(value: boolean): OptionsChain
  breaks(value: boolean): OptionsChain
  linkify(value: boolean): OptionsChain
  typographer(value: boolean): OptionsChain
  langPrefix(value: string): OptionsChain
  quotes(value: string | string[]): OptionsChain
  highlight(fn: (code: string, lang: string) => string): OptionsChain
}

export interface MarkdownChain extends ChainedMap {
  plugins: ChainedMap
  options: OptionsChain
  plugin(name: string): PluginChain
  toConfig(): Options
  toMd(md: MarkdownItConstructor, options?: any): MarkdownIt
}

export = MarkdownChain
