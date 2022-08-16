import { ReactNode } from "react";
export const Tooltip = ({
  message,
  children,
}: {
  message: string;
  children: ReactNode;
}) => {
  return (
    <div className="group relative flex flex-col ">
      {children}
      <div className="absolute bottom-14  hidden flex-col items-center group-hover:flex">
        <span className="whitespace-no-wrap relative z-10 rounded-md bg-red-600 p-2 text-lg leading-none text-white shadow-lg">
          {message}
        </span>
        <div className="-mt-2 h-3 w-3 rotate-45 bg-[red]"></div>
      </div>
    </div>
  );
};
