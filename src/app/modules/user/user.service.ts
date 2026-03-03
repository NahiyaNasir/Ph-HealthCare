import status from "http-status";
import { Role, Specialty } from "../../../generated/prisma/client";
import AppError from "../../errorHelpers/AppError";
import { auth } from "../../lib/auth";
import { prisma } from "../../lib/prisma";
import { IAdminCreate, ICreataDoctor } from "./user.interface";

const createDoctorService = async (payload: ICreataDoctor) => {
  const specialties: Specialty[] = [];
  // console.log(specialties,"userservice");
  for (const specialtyId of payload.specialties) {
    const specialty = await prisma.specialty.findUnique({
      where: {
        id: specialtyId,
      },
    });
    if (!specialty) {
     
      throw new AppError(status.NOT_FOUND, `Specialty with id ${specialtyId} not found`);
    }
    specialties.push(specialty);
  }
  const userExist = await prisma.user.findUnique({
    where: {
      email: payload.doctor.email,
    },
  });
  if (userExist) {
    
    throw new AppError(status.CONFLICT, "User with this email already exists");
  }
  const userData = await auth.api.signUpEmail({
    body: {
      email: payload.doctor.email,
      name: payload.doctor.name,
      role: Role.DOCTOR,

      password: payload.password,
      needPasswordChange: true,
    },
  });
  // console.log(userData,"userData");
  try {
    const result = await prisma.$transaction(async (tx) => {
      const doctorData = await tx.doctor.create({
        data: {
          userId: userData.user.id,
          ...payload.doctor,
        },
      });
      console.log(doctorData, "doctorData");
      const doctorSpecialtyData = specialties.map((specialty) => ({
        doctorId: doctorData.id,
        specialtyId: specialty.id,
      }));
      // console.log(doctorSpecialtyData,"doctorSpecialtyData");
      await tx.doctorSpecialty.createMany({
        data: doctorSpecialtyData,
      });
      const doctor = await tx.doctor.findUnique({
        where: {
          id: doctorData.id,
        },
        select: {
          id: true,
          userId: true,
          name: true,
          email: true,
          profilePhoto: true,
          contactNumber: true,
          address: true,
          registrationNumber: true,
          experience: true,
          gender: true,
          appointmentFee: true,
          qualification: true,
          currentWorkingPlace: true,
          designation: true,
          user: {
            select: {
              email: true,
              name: true,
              role: true,
              status: true,
              emailVerified: true,
              image: true,
            },
          },
          Specialties: {
            select: {
              specialty: {
                select: {
                  title: true,
                },
              },
            },
          },
        },
      });
      //  console.log(doctor,"doctor");
      return doctor;
    });
    console.log(result, "result");
    return result;
  } catch (error) {
    console.log("Transaction error : ", error);
    await prisma.user.delete({
      where: {
        id: userData.user.id,
      },
    });
    throw error;
  }
};
const createAdmin = async (payload: IAdminCreate) => {
  const userExists = await prisma.user.findUnique({
    where: {
      email: payload.admin.email,
    },
  });
  if (userExists) {
   
    throw new AppError(status.CONFLICT, "User with this email already exists");
  }

  const userData = await auth.api.signUpEmail({
    body: {
      email: payload.admin.email,
      password: payload.password,
      role: Role.ADMIN,
      name: payload.admin.name,
      needPasswordChange: true,
      rememberMe: false,
    },
  });
  console.log(userData, "userData");
  try {
    const result = await prisma.$transaction(async (tx) => {
      // Create admin record
      const admin = await tx.admin.create({
        data: {
          userId: userData.user.id,
          name: payload.admin.name,
          email: payload.admin.email,
          profilePhoto: payload.admin.profilePhoto,
          contactNumber: payload.admin.contactNumber,
        },
      });
      console.log(admin, "Admin");
      // Fetch created admin with user data
      const createdAdmin = await tx.admin.findUnique({
        where: { id: admin.id },
        select: {
          id: true,
          name: true,
          email: true,
          profilePhoto: true,
          contactNumber: true,
          isDeleted: true,
          createdAt: true,
          updatedAt: true,
          user: {
            select: {
              id: true,
              name: true,
              email: true,
              role: true,
              status: true,
            },
          },
        },
      });
      console.log(createAdmin, "createAdmin");
      return createdAdmin;
    });

    return result;
  } catch (error) {
    console.log("Error creating admin: ", error);
    await prisma.user.delete({
      where: {
        id: userData.user.id,
      },
    });
    throw error;
  }
};
const createSuperAdmin = async (payload: IAdminCreate) => {
  const userExists = await prisma.user.findUnique({
    where: {
      email: payload.admin.email,
    },
  });
  if (userExists) {
    
    throw new AppError(status.CONFLICT, "User with this email already exists");
  }

  const userData = await auth.api.signUpEmail({
    body: {
      email: payload.admin.email,
      password: payload.password,
      role: Role.SUPER_ADMIN,
      name: payload.admin.name,
      needPasswordChange: true,
      rememberMe: false,
    },
  });
  console.log(userData, "userData");
  try {
    const result = await prisma.$transaction(async (tx) => {
      // Create admin record
      const admin = await tx.admin.create({
        data: {
          userId: userData.user.id,
          name: payload.admin.name,
          email: payload.admin.email,
          profilePhoto: payload.admin.profilePhoto,
          contactNumber: payload.admin.contactNumber,
        },
      });
      console.log(admin, "Admin");
      // Fetch created admin with user data
      const createdAdmin = await tx.admin.findUnique({
        where: { id: admin.id },
        select: {
          id: true,
          name: true,
          email: true,
          profilePhoto: true,
          contactNumber: true,
          isDeleted: true,
          createdAt: true,
          updatedAt: true,
          user: {
            select: {
              id: true,
              name: true,
              email: true,
              role: true,
              status: true,
            },
          },
        },
      });
      console.log(createAdmin, "createAdmin");
      return createdAdmin;
    });

    return result;
  } catch (error) {
    console.log("Error creating admin: ", error);
    await prisma.user.delete({
      where: {
        id: userData.user.id,
      },
    });
    throw error;
  }
};

export const userService = {
  createDoctorService,
  createAdmin,
  createSuperAdmin
};
