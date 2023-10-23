const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const createStudent = async (req, res) => {
  const { id, firstName, lastName, email, address } = req.body;
  const result = await prisma.students.create({
    data: {
      firstName,
      lastName,
      email,
      address,
    },
  });
  res.send({ message: "Successfully created 👍🦄🥰", data: result });
};

const getAllStudents = async (req, res) => {
  const result = await prisma.students.findMany();
  res.send({ message: "Successfully get all🦄🥰", data: result });
};

const getAllByPaging = async (req, res) => {
  let { pageSize, pageIndex } = req.params;
  pageIndex = parseInt(pageIndex);
  pageSize = parseInt(pageSize);
  const offset = (pageIndex - 1) * pageSize;

  const result = await prisma.students.findMany({
    skip: offset,
    take: pageSize,
    orderBy: { id: "asc" },
  });

  const count = await prisma.students.count();
  res.send({ message: "Successfully get all by paging 🦄🥰", data: result, total: count, pageIndex, pageSize });
};

const getByStudentId = async (req, res) => {
  const id = parseInt(req.params.id, 10);
  const result = await prisma.students.findFirst({
    where: { id },
  });
  res.send({ message: "Successfully get by id 🦄🥰", data: result });
};

module.exports = {
  createStudent,
  getAllStudents,
  getByStudentId,
  getAllByPaging,
};
