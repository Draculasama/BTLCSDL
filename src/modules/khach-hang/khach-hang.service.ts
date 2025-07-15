import { Injectable } from '@nestjs/common';
import { CreateKhachHangDto } from './dto/create-khachhang.dto';
import { UpdateKhachHangDto } from './dto/update-khachhang.dto';
import { Repository } from 'typeorm';
import { KhachHang } from './entities/khach-hang.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { TaiKhoan } from '../tai-khoan/entities/tai-khoan.entity';
import { UserRole } from 'src/common/constants/constants';
import * as bcrypt from 'bcrypt';

@Injectable()
export class KhachHangService {
  constructor(
    @InjectRepository(KhachHang)
    private readonly khachHangRepository: Repository<KhachHang>,
  ) {}

  async create(createKhachHangDto: CreateKhachHangDto): Promise<unknown> {
    const taikhoan = new TaiKhoan();
    taikhoan.tenDangNhap = createKhachHangDto.tenDangNhap;
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
    taikhoan.matKhau = await bcrypt.hash(createKhachHangDto.matKhau, 10);
    taikhoan.loai = UserRole.KHACHHANG;
    const khachHang = this.khachHangRepository.create({
      ...createKhachHangDto,
      taiKhoan: taikhoan,
    });

    return await this.khachHangRepository.save(khachHang);
  }

  findAll(): Promise<KhachHang[]> {
    return this.khachHangRepository.find();
  }

  findOne(id: number) {
    return this.khachHangRepository.findOne({
      where: { id },
    });
  }
  update(id: number, updateKhachHangDto: UpdateKhachHangDto) {
    return this.khachHangRepository.update(id, updateKhachHangDto);
  }

  async remove(id: number): Promise<void> {
    await this.khachHangRepository.delete(id);
  }
}
