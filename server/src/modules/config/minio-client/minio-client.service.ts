import { Injectable, Logger, HttpException, HttpStatus } from '@nestjs/common';
import { MinioService } from 'nestjs-minio-client';
import { BufferedFile, StoredFile } from './dto/file.dto';
import { ConfigService } from '@nestjs/config';
import * as crypto from 'crypto'
import { Stream } from 'stream';
@Injectable()
export class MinioClientService {

  private readonly logger: Logger;
  constructor(
    private readonly minio: MinioService,
    private readonly configService: ConfigService
  ) {
    this.logger = new Logger('MinioStorageService');
  }

  private readonly baseBucket = this.configService.get("MINIO_BUCKET")

  public get client () {
    return this.minio.client;
  }

  public async upload(file: BufferedFile, baseBucket: string = this.baseBucket) {
    const utf8 = require('utf8');
    const contentDispositionFileName: string = encodeURIComponent(utf8.decode(`${file.originalname}`));
    const metaData = {
      'Content-Type': file.mimetype,
      'Content-Disposition': `attachment; filename=${contentDispositionFileName}`
    };
    let temp_filename = Date.now().toString()
    let hashedFileName = crypto.createHash('md5').update(temp_filename).digest("hex");
    let ext = file.originalname.substring(file.originalname.lastIndexOf('.'), file.originalname.length);
    let filename = hashedFileName;
    const fileName: string = `${filename}`;
    const fileBuffer = file.buffer;
    try{
      await this.client.putObject(baseBucket, fileName, fileBuffer, metaData);
      return {
        fileId: `${fileName}`
      }
    } catch(err) {
      throw new HttpException('Error uploading file :' + err, HttpStatus.BAD_REQUEST)
    }
  }

  async delete(objetName: string, baseBucket: string = this.baseBucket) {
    this.client.removeObject(baseBucket, objetName, function (err, res) {
      if (err) throw new HttpException("Error deleting file :", HttpStatus.BAD_REQUEST)
    })
  }

  async download(objetName: string, baseBucket: string = this.baseBucket) {
    try {
      let storedFile:StoredFile = await this.client.statObject(baseBucket, objetName);
      let fileBuffer:Buffer = await new Promise<Buffer>((resolve, reject) => {
        let result: Buffer = Buffer.from([]);
        // let size = 0;
        return this.client.getObject(baseBucket, objetName,(err: Error, dataStream: Stream) => {
          if (err) {
              console.error(err);
              return reject(
                  "Encountered Error while getting file"
              );
          }
          dataStream.on('data', function(chunk:Buffer) {
            // size += chunk.length
            result = Buffer.concat([result, chunk]);
          })
          dataStream.on('end', function() {
            // console.log('End. Total size = ' + size)
            return resolve(result);
          })
          dataStream.on('error', function(err) {
            return reject(
              "Encountered Error while getting file"
            );
          })
        })
      });
      storedFile.file = fileBuffer;
      return storedFile;
    } catch(err) {
      throw new HttpException('Error downloading file :' + err, HttpStatus.BAD_REQUEST)
    }
  }
}