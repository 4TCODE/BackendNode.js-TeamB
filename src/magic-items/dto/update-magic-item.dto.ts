import { PartialType } from '@nestjs/mapped-types';
import { CreateMagicItemDto } from './create-magic-item.dto';

export class UpdateMagicItemDto extends PartialType(CreateMagicItemDto) {}
