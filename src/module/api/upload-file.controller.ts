import { Controller, Post, UploadedFile, UseInterceptors } from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import { diskStorage } from "multer";
import { FirebaseAdmin, FirebaseModule, InjectFirebaseAdmin } from "nestjs-firebase";
import { PublicApi } from "src/@core/decorators/public-api.decorator";

@Controller('upload-file')
@PublicApi()
export class UploadFileController {
    constructor() {}
    @Post('')
    @UseInterceptors(FileInterceptor('file', {
        storage: diskStorage({
            destination: 'images/',
            filename(req, file: Express.Multer.File, callback) {
                const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
                callback(null, `${uniqueSuffix}_${file.originalname}`)
            },
        }),
        // preservePath: true
    }))
    uploadFile(@UploadedFile() file: Express.Multer.File) {
        //file:///C:/Users/Admin/Desktop/projectFruit/back_end/fruit/images/1688052216242-487254687_19145130159187790.jpg
        console.log(file);
    }
}