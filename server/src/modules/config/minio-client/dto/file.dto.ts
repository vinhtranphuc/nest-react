export interface BufferedFile {
    fieldname: string;
    originalname: string;
    encoding: string;
    mimetype: string;
    size: number;
    buffer: Buffer | string;
}
export interface StoredFile {
    size: number;
    metaData: Object;
    lastModified: Date;
    versionId: string;
    etag: string;
    file?: Buffer | string;
    originalname: string;
}
// export type AppMimeType =
//     | 'image/png'
//     | 'image/jpeg';