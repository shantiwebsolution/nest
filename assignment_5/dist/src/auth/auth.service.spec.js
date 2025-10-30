"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const testing_1 = require("@nestjs/testing");
const jwt_1 = require("@nestjs/jwt");
const typeorm_1 = require("@nestjs/typeorm");
const common_1 = require("@nestjs/common");
const bcrypt = require("bcrypt");
const auth_service_1 = require("./auth.service");
const user_entity_1 = require("../users/user.entity");
describe('AuthService', () => {
    let service;
    let userRepository;
    let jwtService;
    const mockUserRepository = {
        findOne: jest.fn(),
        create: jest.fn(),
        save: jest.fn(),
    };
    const mockJwtService = {
        sign: jest.fn(),
    };
    beforeEach(async () => {
        const module = await testing_1.Test.createTestingModule({
            providers: [
                auth_service_1.AuthService,
                {
                    provide: (0, typeorm_1.getRepositoryToken)(user_entity_1.User),
                    useValue: mockUserRepository,
                },
                {
                    provide: jwt_1.JwtService,
                    useValue: mockJwtService,
                },
            ],
        }).compile();
        service = module.get(auth_service_1.AuthService);
        userRepository = module.get((0, typeorm_1.getRepositoryToken)(user_entity_1.User));
        jwtService = module.get(jwt_1.JwtService);
    });
    afterEach(() => {
        jest.clearAllMocks();
    });
    describe('register', () => {
        it('should register a new user successfully', async () => {
            const registerDto = {
                email: 'test@example.com',
                password: 'password123',
                name: 'Test User',
                role: user_entity_1.UserRole.USER,
            };
            mockUserRepository.findOne.mockResolvedValue(null);
            mockUserRepository.create.mockReturnValue({
                id: '1',
                ...registerDto,
                password: 'hashedPassword',
            });
            mockUserRepository.save.mockResolvedValue({
                id: '1',
                ...registerDto,
                password: 'hashedPassword',
            });
            mockJwtService.sign.mockReturnValue('jwt-token');
            const result = await service.register(registerDto);
            expect(result).toHaveProperty('access_token');
            expect(result).toHaveProperty('user');
            expect(result.user).not.toHaveProperty('password');
        });
        it('should throw ConflictException if user already exists', async () => {
            const registerDto = {
                email: 'existing@example.com',
                password: 'password123',
                name: 'Existing User',
            };
            mockUserRepository.findOne.mockResolvedValue({ id: '1', email: registerDto.email });
            await expect(service.register(registerDto)).rejects.toThrow(common_1.ConflictException);
        });
    });
    describe('login', () => {
        it('should login user successfully', async () => {
            const loginDto = {
                email: 'test@example.com',
                password: 'password123',
            };
            const user = {
                id: '1',
                email: loginDto.email,
                password: await bcrypt.hash(loginDto.password, 10),
                name: 'Test User',
                role: user_entity_1.UserRole.USER,
            };
            mockUserRepository.findOne.mockResolvedValue(user);
            mockJwtService.sign.mockReturnValue('jwt-token');
            const result = await service.login(loginDto);
            expect(result).toHaveProperty('access_token');
            expect(result).toHaveProperty('user');
            expect(result.user).not.toHaveProperty('password');
        });
        it('should throw UnauthorizedException if user not found', async () => {
            const loginDto = {
                email: 'nonexistent@example.com',
                password: 'password123',
            };
            mockUserRepository.findOne.mockResolvedValue(null);
            await expect(service.login(loginDto)).rejects.toThrow(common_1.UnauthorizedException);
        });
    });
});
//# sourceMappingURL=auth.service.spec.js.map