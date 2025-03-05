import Image from "next/image";
import Link from "next/link";

const Title = () => {
  return (
    <div className="text-2xl font-semibold mb-6 flex space-x-1">
      <Link href={"/"} className="flex justify-center items-center">
        <Image alt="Back Icon" src="/icons/back.svg" height={25} width={25} />
      </Link>

      <div>
        Project Manager Interview:{" "}
        <span className="font-normal">Screening Round</span>
      </div>
    </div>
  );
};

export default Title;
