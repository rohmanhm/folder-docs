// Copyright (c) 2019 rohmanhm
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import * as path from 'path'
import * as DirTree from 'directory-tree'
import JsonToTs from 'json-to-ts'

export interface FolderDocsConfig {
  /**
   * Base current directory
   */
  baseDir: string

  /**
   * Add prefix to path
   */
  prefixPath?: string

  /**
   * Path to exclude from folder tree,
   */
  exclude?: RegExp | RegExp[]

  /**
   * Will support plugins soon
   * @TODO
   */
  plugins?: string[]
}

export interface FolderDocsObject {
  name: string
  path: string
  realPath: string
  onRoot: boolean
}

export interface FolderDocsOutputWalker {
  [key: string]: FolderDocsObject
}

const defaultConfig: FolderDocsConfig = {
  baseDir: process.cwd(),
  exclude: /node_modules|.git/,
  prefixPath: '/'
}

export class FolderDocs {
  public config: FolderDocsConfig

  constructor (customConfig?: FolderDocsConfig) {
    let config: FolderDocsConfig = {
      ...defaultConfig,
      ...customConfig
    }

    if (customConfig && customConfig.baseDir === '') {
      config.baseDir = process.cwd()
    }

    this.config = config
  }

  public walker (): FolderDocsOutputWalker {
    const { baseDir, exclude, prefixPath = '' } = this.config
    const results: FolderDocsOutputWalker = {}

    DirTree(baseDir, { exclude }, file => {
      const relativePath = path.relative(baseDir, file.path)
      const output = {
        name: file.name,
        path: path.join(prefixPath, relativePath),
        realPath: relativePath,
        onRoot: file.name === relativePath
      }

      results[relativePath] = output
    })

    return results
  }

  public exportToTypescript () {
    let output = ''

    JsonToTs(this.walker()).forEach((iface, i) => {
      output += i === 0 ? iface : `\n\n${iface}`
    })

    return output
  }
}

export default FolderDocs
