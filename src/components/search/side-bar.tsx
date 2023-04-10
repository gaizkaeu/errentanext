
type NavProps = {
  currentStepIndex: number;
  goTo: (index: number) => void;
};

const SideBar = ({ currentStepIndex, goTo }: NavProps) => {
  return (
    <div className="absolute left-0 w-full md:w-[25%] md:relative md:top-0 md:left-0">
      <nav className="py-5  bg-slate-50 h-full rounded-md border dark:bg-midnight-700 dark:border-midnight-800 border-slate-100 md:p-5">
        <ul className="flex justify-center gap-2 md:flex-col">
          <li className="flex flex-col items-start font-medium">
            <span className="hidden  uppercase text-sm md:flex">
              step 1
            </span>
            <button
              tabIndex={0}
              onClick={() => goTo(0)}
              className={`text-sm ${
                currentStepIndex === 0 ? "font-bold" : "font-light"
              } md:text-base`}
            >
                Your info
            </button>
          </li>
          <li className="flex flex-col items-start font-medium">
            <span className="hidden text-neutral-500 uppercase text-sm md:flex">
              step 2
            </span>
            <button
              tabIndex={0}
              onClick={() => goTo(1)}
              className={`text-sm ${
                currentStepIndex === 1 ? "font-bold" : "font-light"
              } md:text-base`}
            >
                Select plan
            </button>
          </li>
          <li className="flex flex-col items-start font-medium">
            <span className="hidden text-neutral-500 uppercase text-sm md:flex">
              step 3
            </span>
            <button
              tabIndex={0}
              onClick={() => goTo(2)}
              className={`text-sm ${
                currentStepIndex === 2 ? "font-bold" : "font-light"
              } md:text-base`}
            >
                Add-ons
            </button>
          </li>
          <li className="flex flex-col items-start font-medium">
            <span className="hidden text-neutral-500 uppercase text-sm md:flex">
              step 4
            </span>
            <button
              tabIndex={0}
              onClick={() => goTo(3)}
              className={`text-sm ${
                currentStepIndex === 3 ? "font-bold" : "font-light"
              } md:text-base`}
            >
                Summary
            </button>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export { SideBar };