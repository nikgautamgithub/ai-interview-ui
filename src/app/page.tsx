import Link from "next/link";

export default function Home() {
  return (
    <div className="h-dvh w-dvw bg-[#1A1F24] flex justify-center items-center">
      <Link
        href={"/room"}
        className="bg-green-700/50 m-4 p-4 rounded-md shadow-2xl hover:bg-green-700/80 text-gray-300 cursor-pointer"
      >
        Start Interview
      </Link>
    </div>
  );
}
