import { Injectable } from '@nestjs/common';

import { JwtService } from '@nestjs/jwt';
import { UserRole } from 'src/common/constants/constants';
import { TaiKhoanService } from '../tai-khoan/tai-khoan.service';
import * as bcrypt from 'bcrypt';
@Injectable()
export class AuthService {
  constructor(
    private taikhoanService: TaiKhoanService,
    private jwtService: JwtService,
  ) {}
  async login(tenDangNhap: string, matKhau: string): Promise<any> {
    const taikhoan = await this.taikhoanService.findOneByUsername(tenDangNhap);
    if (!taikhoan) {
      return 'Tài khoản không tồn tại';
    }
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
    const isMatch = await bcrypt.compare(matKhau, taikhoan.matKhau);
    if (!isMatch) {
      return 'Mật khẩu không đúng';
    }

    const payload = {
      taiKhoan: taikhoan.tenDangNhap,
      id: taikhoan.id,
      loai: taikhoan.loai,
    };
    const token = await this.jwtService.signAsync(payload);
    return {
      access_token: token,
      message: 'Đăng nhập thành công',
    };
  }
}
