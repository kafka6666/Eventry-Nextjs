import Image from "next/image";
import Link from "next/link";
import SignInOut from "./auth/SignInOut";

const Navbar = () => {
  return (
    <nav>
      <div className="container flex justify-between items-center py-4">
        <div className="nav-brand">
          <Link href="/" className="flex mt-2">
            <Image
              src="/new_logo.svg"
              alt="Eventry"
              className="h-[45px]"
              width={100}
              height={100}
            />
            <p className=" text-[#9C9C9C] text-2xl pl-2 pt-1">Eventry</p>
          </Link>
        </div>

        <ul className="flex gap-4 text-[#9C9C9C]">
          <li>
            <SignInOut />
          </li>
          <li>
            <Link href="/about">About</Link>
          </li>
          <li>
            <Link href="/contact-us">Contact Us</Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
