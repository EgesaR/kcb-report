import SignInButton from "./SignInButton"
import TransitionLink from "./utils/TransitionLink";

const Appbar = () => {
    return (
      <header className="flex items-center px-4 py-2.5 gap-2 fixed top-0 z-20 w-full font-semibold text-black bg-gradient-to-r from-[#d3d3d3] to-[#d3d3d3] dark:from-[#0f172abf] dark:to-[#0f172abf] dark:text-slate-200">
        <TransitionLink href="/" className="text-2xl">
                <label className="text-green-800">KCB</label>
                {" "}Report
        </TransitionLink>
        <TransitionLink href="/about" className="ml-auto hover:text-sky-800 dark:hover:text-sky-500">
          About
        </TransitionLink>
        <SignInButton />
      </header>
    );
}

export default Appbar

