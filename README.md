# Folder Docs

> Docs your folder structure with your prefer format.

## How To Use

> Currently only support export to typescript

```ts
import FolderDocs from "folder-docs";

const basicFolderDocs = new FolderDocs({
  baseDir: "test/fixtures"
});

console.log(basicFolderDocs.exportToTypescript());
// Output
/*
interface RootObject {
  'folder1/image1.png': Folder1image1png;
  'folder2/image2.png': Folder1image1png;
  'main.png': Folder1image1png;
}

interface Folder1image1png {
  name: string;
  path: string;
  realPath: string;
  onRoot: boolean;
}
*/
```

## API

- Instance `FolderDocs`.

  ```ts
  new FolderDocs(config);
  ```

  - Config
    | Key | Default value | Description |
    | --- | --- | --- |
    | baseUrl (required) | `process.cwd` | Base URL folder needs to docs|
    | exclude | `/node_modules|.git/` | Folder/Files uses regex to exclude from docs |
    | prefix | `/` | Add prefix to object `path` |

## Author

[Rohman Habib M (@rohmanhm)](https://github.com/rohmanhm)
