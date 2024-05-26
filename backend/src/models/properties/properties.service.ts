import { Injectable } from '@nestjs/common';
import { CreatePropertyDto } from './dto/create-property.dto';
import { UpdatePropertyDto } from './dto/update-property.dto';
import { Property } from './schema/properties.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class PropertiesService {
  constructor(
    @InjectModel(Property.name) private readonly propertyModel: Model<Property>,
  ) {}
  async create(createPropertyDto: CreatePropertyDto): Promise<Property> {
    const property = new this.propertyModel(createPropertyDto);
    return await property.save();
  }

  async findAll(): Promise<Property[]> {
    return await this.propertyModel
      .find()
      .sort({
        createdAt: -1,
      })
      .lean()
      .exec();
  }

  async findAllPropertyByUserId(id: string): Promise<Property[]> {
    return await this.propertyModel
      .find({
        userId: id,
      })
      .sort({
        createdAt: -1,
      })
      .lean()
      .exec();
  }

  async findOne(id: string): Promise<Property> {
    return await this.propertyModel
      .findById(id)
      .populate('userId')
      .lean()
      .exec();
  }

  update(id: number, updatePropertyDto: UpdatePropertyDto) {
    return `This action updates a #${id} property`;
  }

  async remove(id: string): Promise<Property> {
    return await this.propertyModel.findByIdAndDelete(id);
  }
}
