import { UserRole } from '../../users/user.entity';
export declare class RegisterDto {
    email: string;
    password: string;
    name: string;
    role?: UserRole;
}
