export interface FolderDocsConfig {
    /**
     * Base current directory
     */
    baseDir: string;
    /**
     * Add prefix to path
     */
    prefixPath?: string;
    /**
     * Path to exclude from folder tree,
     */
    exclude?: RegExp | RegExp[];
    /**
     * Will support plugins soon
     * @TODO
     */
    plugins?: string[];
}
export interface FolderDocsObject {
    name: string;
    path: string;
    realPath: string;
    onRoot: boolean;
}
export interface FolderDocsOutputWalker {
    [key: string]: FolderDocsObject;
}
export declare class FolderDocs {
    config: FolderDocsConfig;
    constructor(customConfig?: FolderDocsConfig);
    walker(): FolderDocsOutputWalker;
    exportToTypescript(): string;
}
export default FolderDocs;
