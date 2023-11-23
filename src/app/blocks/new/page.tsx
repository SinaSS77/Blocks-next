import { db } from "@/db"; // (../../../db) it is a feature in NextJS that @ means in the root
import { redirect } from "next/navigation";
export default function BlockCreatePage(){
  async function createBlock(formData: FormData){
    // Mark this function as a SERVER action
    "use server"
    // Get the form data
      const title = formData.get("title") as string;
      const code = formData.get("code") as string;

    // Insert the data into the database using prisma
     const block =  await db.block.create({data: {title, code} })
    //Redirect the user back to the homepage
    redirect("/")
  }
  return (
    <form action={createBlock}>
      <h3 className="font-bold m-3">Create a Block</h3>
      <div className="flex flex-col gap-4">
      <div className="flex gap-4">
        <label className="w-12" htmlFor="title">Title</label>
        <input
        name="title"
        id="title"
        className="border rounded p-2 w-full"
        />
      </div>
      <div className="flex gap-4">
      <label className="w-12" htmlFor="code">Code</label>
        <textarea
        name="code"
        className="border rounded p-2 w-full"/>
      </div>
      <button className="rounded p-2 bg-blue-700 text-white w-60 justify-center" type="submit">Create</button>
      </div>  
    </form>
  );
}