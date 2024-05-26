import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { FileuploadService } from './fileupload.service';
import { CreateFileuploadDto } from './dto/create-fileupload.dto';
import { UpdateFileuploadDto } from './dto/update-fileupload.dto';
import { ResponseService } from 'src/common/interceptors/response.interceptor';
import { ApiTags } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';

@ApiTags('File Uploads')
@UseInterceptors(ResponseService)
@Controller('fileupload')
export class FileuploadController {
  constructor(private readonly fileuploadService: FileuploadService) {}

  @UseInterceptors(FileInterceptor('file'))
  @Post()
  async fileCreate(@UploadedFile() file: Express.Multer.File) {
    return await this.fileuploadService.uploadFile(
      file.originalname,
      file.buffer,
      file.mimetype,
    );
  }

  @Get()
  findAll() {
    return this.fileuploadService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.fileuploadService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateFileuploadDto: UpdateFileuploadDto,
  ) {
    return this.fileuploadService.update(+id, updateFileuploadDto);
  }

  @Delete(':fileName')
  async removeFile(@Param('fileName') fileName: string) {
    return await this.fileuploadService.deleteFile(fileName);
  }
}
