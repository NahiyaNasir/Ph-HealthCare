
import { Gender, Role } from "../../../generated/prisma/enums";
export interface ICreataDoctor{
  password: string;
    doctor: {
        name: string;
        email: string;
        profilePhoto?: string;
        contactNumber?: string;
        address?: string;
        registrationNumber: string;
        experience?: number;
        gender: Gender;
        appointmentFee: number;
        qualification: string;
        currentWorkingPlace: string;
        designation: string;
    }
    specialties: string[];
}

export interface  IAdminCreate{
 password: string;
    admin: {
        name: string;
        email: string;
        profilePhoto?: string;
        contactNumber?: string;
    }
    role: "ADMIN"
}
export interface  ISuperAdmin{
 password: string;
    SuperAdmin: {
        name: string;
        email: string;
        profilePhoto?: string;
        contactNumber?: string;
    }
    role: "SUPER_ADMIN";
}

