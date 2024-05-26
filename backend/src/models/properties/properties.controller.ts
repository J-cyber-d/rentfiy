import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  UseGuards,
} from '@nestjs/common';
import { PropertiesService } from './properties.service';
import { CreatePropertyDto } from './dto/create-property.dto';
import { UpdatePropertyDto } from './dto/update-property.dto';
import { Property } from './schema/properties.schema';
import { ApiTags } from '@nestjs/swagger';
import { ResponseService } from 'src/common/interceptors/response.interceptor';
import { AuthenticationGuard } from 'src/authentication/authentication.guard';
import { FileuploadService } from '../fileupload/fileupload.service';

@ApiTags('Properties')
@UseInterceptors(ResponseService)
@Controller('properties')
export class PropertiesController {
  constructor(
    private readonly propertiesService: PropertiesService,
    private readonly fileUploadService: FileuploadService,
  ) {}

  @UseGuards(AuthenticationGuard)
  @Post()
  async create(
    @Body() createPropertyDto: CreatePropertyDto,
  ): Promise<Property> {
    return this.propertiesService.create(createPropertyDto);
  }

  @Get()
  async findAll(): Promise<any[]> {
    const properties = await this.propertiesService.findAll();
    const propertiesWithSignedUrls = await Promise.all(
      properties.map(async (property) => {
        if (property.files && property.files.length > 0) {
          const signedUrl = await this.fileUploadService.getSignedUrl(
            property.files[0],
          );
          return { ...property, signedImageUrl: signedUrl };
        }
        return property;
      }),
    );
    return propertiesWithSignedUrls;
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<any> {
    const property = await this.propertiesService.findOne(id);
    if (property.files && property.files.length > 0) {
      const signedUrl = await this.fileUploadService.getSignedUrl(
        property.files[0],
      );
      return { ...property, signedImageUrl: signedUrl };
    }
    return property;
  }

  @UseGuards(AuthenticationGuard)
  @Get('sell/:userId')
  async findAllPropertyByUserId(
    @Param('userId') userId: string,
  ): Promise<any[]> {
    const properties =
      await this.propertiesService.findAllPropertyByUserId(userId);
    const propertiesWithSignedUrls = await Promise.all(
      properties.map(async (property) => {
        if (property.files && property.files.length > 0) {
          const signedUrl = await this.fileUploadService.getSignedUrl(
            property.files[0],
          );
          return { ...property, signedImageUrl: signedUrl };
        }
        return property;
      }),
    );
    return propertiesWithSignedUrls;
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updatePropertyDto: UpdatePropertyDto,
  ) {
    return this.propertiesService.update(+id, updatePropertyDto);
  }

  @UseGuards(AuthenticationGuard)
  @Delete(':id')
  async remove(@Param('id') id: string): Promise<Property> {
    return this.propertiesService.remove(id);
  }
}
