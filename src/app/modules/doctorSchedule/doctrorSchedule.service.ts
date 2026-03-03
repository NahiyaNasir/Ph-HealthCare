import { prisma } from "../../lib/prisma";
import {
  ICreateDoctorSchedulePayload,
  IUpdateDoctorSchedulePayload,
} from "./doctorschedule.interface";
import { IQueryParams } from "../../interface/QueryBuilder.interface";
import { QueryBuilder } from "../../utils/quaryBuilder";
import { DoctorSchedules, Prisma } from "../../../generated/prisma/client";

import {
  doctorScheduleFilterableFields,
  doctorScheduleIncludeConfig,
  doctorScheduleSearchableFields,
} from "./doctorSchedule.constant";

const createMyDoctorSchedule = async (
  user: any,
  payload: ICreateDoctorSchedulePayload,
) => {
  const doctorData = await prisma.doctor.findFirstOrThrow({
    where: {
      email: user.email,
    },
  });
  const doctorScheduleData = payload.scheduleIds.map((scheduleId) => ({
    doctorId: doctorData.id,
    scheduleId,
  }));

  await prisma.doctorSchedules.createMany({
    data: doctorScheduleData,
  });

  const result = await prisma.doctorSchedules.findMany({
    where: {
      doctorId: doctorData.id,
      scheduleId: {
        in: payload.scheduleIds,
      },
    },
    include: {
      schedule: true,
    },
  });
  return result;
};
const getAllDoctorSchedule = async (query: IQueryParams) => {
  const queryBuilder = new QueryBuilder<
    DoctorSchedules,
    Prisma.DoctorSchedulesWhereInput,
    Prisma.DoctorSchedulesInclude
  >(prisma.doctorSchedules, query, {
    filterableFields: doctorScheduleFilterableFields,
    searchableFields: doctorScheduleSearchableFields,
  });
  const result = await queryBuilder
    .search()
    .filter()
    .paginate()
    .sort()
    .fields()
    .include({
      schedule: true,
      doctor: {
        include: {
          user: true,
        },
      },
    })
    .dynamicInclude(doctorScheduleIncludeConfig)
    .execute();
  return result;
};
const getMyDoctorSchedules = async (user : any, query : IQueryParams) => {
    const doctorData = await prisma.doctor.findUniqueOrThrow({
        where:{
            email : user.email
        }
    });
    const queryBuilder = new QueryBuilder<DoctorSchedules, Prisma.DoctorSchedulesWhereInput, Prisma.DoctorSchedulesInclude>(prisma.doctorSchedules,
    {
    doctorId: doctorData.id,
    ...query
    }, 
    {
        filterableFields: doctorScheduleFilterableFields,
        searchableFields: doctorScheduleSearchableFields
    })
    const doctorSchedules = await queryBuilder
    .search()
    .filter()
    .paginate()
    .include({
        schedule: true,
        doctor : {
            include:{
                user: true,
            }
        }
    })
    .sort()
    .fields()
    .dynamicInclude(doctorScheduleIncludeConfig)
    .execute();
    return doctorSchedules;
}
const getDoctorScheduleById = async (doctorId: string, scheduleId: string) => {
  const doctorSchedule = await prisma.doctorSchedules.findUnique({
    where: {
      doctorId_scheduleId: {
        doctorId: doctorId,
        scheduleId: scheduleId,
      },
    },
    include: {
      schedule: true,
      doctor: true,
    },
  });
  return doctorSchedule;
};

const updateMyDoctorSchedule = async (
  user: any,
  payload: IUpdateDoctorSchedulePayload,
) => {
  const doctorData = await prisma.doctor.findUniqueOrThrow({
    where: {
      email: user.email,
    },
  });
  const deleteIds = payload.scheduleIds
    .filter((schedule) => schedule.shouldDelete)
    .map((schedule) => schedule.id);
  const createIds = payload.scheduleIds
    .filter((schedule) => !schedule.shouldDelete)
    .map((schedule) => schedule.id);
  const result = await prisma.$transaction(async (tx) => {
    await tx.doctorSchedules.deleteMany({
      where: {
        isBooked: false,
        doctorId: doctorData.id,
        scheduleId: {
          in: deleteIds,
        },
      },
    });

    const doctorScheduleData = createIds.map((scheduleId) => ({
      doctorId: doctorData.id,
      scheduleId,
    }));

    const result = await tx.doctorSchedules.createMany({
      data: doctorScheduleData,
    });

    return result;
  });
  return result;
};
const deleteMyDoctorSchedule = async (id: string, user: any) => {
  const doctorData = await prisma.doctor.findUniqueOrThrow({
    where: {
      email: user.email,
    },
  });

  await prisma.doctorSchedules.deleteMany({
    where: {
      doctorId: doctorData.id,
      scheduleId: id,
      isBooked: false,
    },
  });
  return doctorData;
};

export const doctorScheduleService = {
  createMyDoctorSchedule,
  getAllDoctorSchedule,
  getDoctorScheduleById,
  getMyDoctorSchedules,
  updateMyDoctorSchedule,
  deleteMyDoctorSchedule,
};
