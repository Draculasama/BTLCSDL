import { PickType } from '@nestjs/swagger';
import { DonHang } from '../entities/don-hang.entity';

export class UpdateDonHangDto extends PickType(DonHang, ['trangThaiDonHang']) {}
