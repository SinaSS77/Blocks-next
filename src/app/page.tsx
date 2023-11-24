import { db } from "@/db";
import Link from "next/link";

export default async function Home() {
  const blocks = await db.block.findMany();
  const renderedBlocks = blocks.map((block) => (
    <Link
      key={block.id}
      href={`/blocks/${block.id}`}
      className="flex justify-between items-center p-3 border rounded"
    >
      {block.title}
      <div>View</div>
    </Link>
  ));

  return (
    <div>
      <div className="flex m-3 justify-between items-center">
        <h1 className="text-xl font-bold">Blocks</h1>
        <Link href="/blocks/new" className="border p-2 rounded">
          New
        </Link>
      </div>
      <div className="flex flex-col gap-2">{renderedBlocks}</div>
    </div>
  );
}
