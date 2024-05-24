import { PartialType } from '@nestjs/mapped-types';
import { CreateMagicMoverDto } from './create-magic-mover.dto';

export class UpdateMagicMoverDto extends PartialType(CreateMagicMoverDto) {}
