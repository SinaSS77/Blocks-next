'use client'
import { db } from "@/db";
import Link from "next/link";
// import { useRouter } from 'next/router';
import { usePathname } from 'next/navigation';

async function deleteBlock(id: number) {
  // Perform deletion using Prisma
  await db.block.delete({
    where: {
      id: id,
    },
  });
}

export default  async function BlockShowPage({ params }: any) {
  const pathname = usePathname();
  // const router = useRouter();
  const blockId = parseInt(params.id, 10); // Convert id to an integer


  const blockView: { title: string; code: string }[] = await db.block.findMany({
    where: {
      id: blockId,
    },
  });
  // Assuming each block has 'title' and 'code' properties
  const blockNames = blockView.map((block) => ({ title: block.title, code: block.code }));

  const handleDelete = async () => {
    try {
      await deleteBlock(blockId);
            } catch (error) {
      console.error("Error deleting block:", error);
    }
  };

  return (
    <div className="m-20">
      <div className="flex flex-row justify-between">
        <div>
          <Link href="/" className="rounded p-3 bg-blue-700 text-white justify-center m-10">
            Back
          </Link>
        </div>

        <div>
          <Link href="/" className="rounded p-3 bg-purple-700 text-white justify-center m-5">
            Edit
          </Link>
          <button onClick={handleDelete} className="link ${pathname === '/' ? 'active' : ''} rounded p-3 bg-red-700 text-white justify-center m-5">
            Delete
          </button>
        </div>
      </div>

      {blockNames.map((block, index) => (
        <div key={index} className="flex justify-between items-center p-3 border-4 border-sky-500 rounded m-10">
          <p>
            <span className="font-bold">Title:</span> {block.title}
          </p>
          <p>
            <span className="font-bold">Code:</span> {block.code}
          </p>
        </div>
      ))}
    </div>
  );
}