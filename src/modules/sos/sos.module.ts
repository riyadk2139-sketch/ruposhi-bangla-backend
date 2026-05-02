import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EmergencyContact } from '../../entities/emergency-contact.entity';
import { SosService } from './sos.service';
import { SosController } from './sos.controller';

@Module({
  imports: [TypeOrmModule.forFeature([EmergencyContact])],
  providers: [SosService],
  controllers: [SosController],
})
export class SosModule {}
