import test from 'ava'
import * as path from 'path'
import FolderDocs from '../dist/lib'

const basicFolderDocs = new FolderDocs({
  baseDir: path.resolve(__dirname, 'fixtures')
})
const prefixFolderDocs = new FolderDocs({
  baseDir: path.resolve(__dirname, 'fixtures'),
  prefixPath: '/media'
})
const expectedExportToTypescript = `interface RootObject {
  'folder1/image1.png': Folder1image1png;
  'folder2/image2.png': Folder1image1png;
  'main.png': Folder1image1png;
}

interface Folder1image1png {
  name: string;
  path: string;
  realPath: string;
  onRoot: boolean;
}`

test('docs folder structure basic', t => {
  const actual = basicFolderDocs.walker()

  t.truthy(actual['main.png'])
  t.truthy(actual['folder1/image1.png'])
  t.truthy(actual['folder2/image2.png'])

  t.truthy(actual['main.png'].onRoot)
})

test('export to typescript basic', t => {
  const actual = basicFolderDocs.exportToTypescript()
  t.truthy(actual)
  t.is(actual, expectedExportToTypescript)
})

test('docs folder structure with custom prefix', t => {
  const actual = prefixFolderDocs.walker()

  t.is(actual['main.png'].path, '/media/main.png')
  t.is(actual['folder1/image1.png'].path, '/media/folder1/image1.png')
})

test('export to typescript with prefix', t => {
  const actual = prefixFolderDocs.exportToTypescript()
  t.truthy(actual)
  t.is(actual, expectedExportToTypescript)
})
