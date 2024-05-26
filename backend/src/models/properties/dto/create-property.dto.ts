import { ApiProperty } from '@nestjs/swagger';
import { SchemaTypes, Types } from 'mongoose';

export class CreatePropertyDto {
  @ApiProperty({
    description: 'Property Owner Id',
    type: SchemaTypes.ObjectId,
    default: '60f0c9b3b3b3f71f0c9b3b3f',
  })
  userId: Types.ObjectId;

  @ApiProperty({
    description: 'Address line 1',
    example: '460 Mela Gandhi Nagar',
  })
  address1: string;

  @ApiProperty({
    description: 'Address line 2',
    example: 'Near the park',
    required: false,
  })
  address2: string;

  @ApiProperty({
    description: 'City of the property',
    example: 'Mumbai',
  })
  city: string;

  @ApiProperty({
    description: 'State of the property',
    example: 'Maharashtra',
  })
  state: string;

  @ApiProperty({
    description: 'Zip code of the property',
    example: '400001',
  })
  zipcode: string;

  @ApiProperty({
    description: 'Country of the property',
    example: 'India',
    default: 'India',
  })
  country: string;

  @ApiProperty({
    description: 'Type of the home',
    example: 'Single Family',
  })
  homeType: string;

  @ApiProperty({
    description: 'Year the property was built',
    example: 2000,
  })
  yearBuilt: number;

  @ApiProperty({
    description: 'Finished square feet of the property',
    example: 1500,
  })
  finishedSquareFeet: number;

  @ApiProperty({
    description: 'Amount in INR',
    example: 5000000,
  })
  amount: number;

  @ApiProperty({
    description: 'Number of bedrooms',
    example: 3,
  })
  bedrooms: number;

  @ApiProperty({
    description: 'Number of bathrooms',
    example: 2,
  })
  bathrooms: number;

  @ApiProperty({
    description: 'Total number of rooms',
    example: 6,
  })
  totalrooms: number;

  @ApiProperty({
    description: 'Does the house have a garage',
    example: 'yes',
  })
  garage: string;

  @ApiProperty({
    description: 'List of appliances',
    example: ['Washing Machine', 'Microwave'],
    isArray: true,
    required: false,
  })
  appliances: string[];

  @ApiProperty({
    description: 'What I love about my home',
    example: 'The beautiful garden',
    required: false,
  })
  description: string;

  @ApiProperty({
    description: 'Property Images',
    example: [
      'dc10b6d7929cd4ec632e810438fc2772910.jpg',
      'dc10b6d7929cd4ec632e810438fc2772910.jpg',
    ],
    isArray: true,
    required: true,
  })
  files: string[];
}
