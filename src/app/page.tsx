import prisma from "@/lib/prisma";

const Page = async () => {
  const users = await prisma.user.findMany();
  return <div>{JSON.stringify(users)}</div>;
};

export default Page;
