import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, Logger, Query, UsePipes, ValidationPipe } from '@nestjs/common';
import { MagicMoversService } from './magic-movers.service';
import { CreateMagicMoverDto } from './dto/create-magic-mover.dto';
import { MagicMover } from './entities/magic-mover.entity';

@Controller('magic-movers')
export class MagicMoversController {
  private logger = new Logger();
  constructor(private readonly magicMoversService: MagicMoversService) {}

  @Post()
  @UsePipes(ValidationPipe)
  async create(@Body() createMagicMoverDto: CreateMagicMoverDto) : Promise<MagicMover> {
    const magicMover: MagicMover = await this.magicMoversService.create(createMagicMoverDto);
    this.logger.log(`A new magic mover has created with id: ${magicMover.id} Successfully ✔.`);
    return magicMover
  }

  @Post('load/:moverId')
  async loadMagicMover(@Param('moverId',ParseIntPipe) moverId: number, @Body('itemsIds') itemsIds: number[]) {
    await this.magicMoversService.load(moverId,itemsIds);
    this.logger.log(`The magic mover with id: ${moverId} loaded Successfully ✔.`);
  }
  
  @Get()
  async findAll() : Promise<MagicMover[]> {
    return await this.magicMoversService.findAll();
  }

  @Get(':moverId')
  async findOne(@Param('moverId',ParseIntPipe) moverId: number) : Promise<MagicMover> {
    return await this.magicMoversService.findOne(moverId);
  }

  @Get('most-active')
  async getMostActiveMovers() : Promise<MagicMover[]> {
    return await this.magicMoversService.getMostActiveMovers();
  }

  @Patch('start-a-mission/:moverId')
  async startAMission(@Param('moverId',ParseIntPipe) moverId: number) {
    await this.magicMoversService.startAMission(moverId);
    this.logger.log(`The magic mover with id: ${moverId} start a new mission Successfully ✔.`);
  }

  @Patch('end-a-mission/:moverId')
  async endAMission(@Param('moverId',ParseIntPipe) moverId: number) {
    await this.magicMoversService.endAMission(moverId);
    this.logger.log(`The magic mover with id: ${moverId} ended his mission Successfully ✔.`);
  }
  
  @Patch('resting/:moverId')
  async resting(@Param('moverId',ParseIntPipe) moverId: number) {
    await this.magicMoversService.resting(moverId);
    this.logger.log(`The magic mover with id: ${moverId} is in the resting phase Successfully ✔.`);
  }

  @Patch('unload/:moverId')
  async unloadMagicMover(@Param('moverId',ParseIntPipe) moverId: number) {
    await this.magicMoversService.unload(moverId);
    this.logger.log(`The magic mover with id: ${moverId} unloaded Successfully ✔.`);
  }

  @Delete(':moverId')
  async remove(@Param('moverId') moverId: number) {
    return await this.magicMoversService.remove(moverId);
  }
}
