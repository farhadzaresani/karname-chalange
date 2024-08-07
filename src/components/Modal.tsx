import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/20/solid";
import React from "react";

type Iprops = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  title: string;
  children: React.ReactNode;
};

const Modal: React.FC<Iprops> = ({ open, setOpen, title, children }) => {
  if (!children) return;

  return (
    <Dialog open={open} onClose={setOpen} className="relative z-10">
      <DialogBackdrop
        transition
        className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in"
      />

      <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div className="flex min-h-full items-end justify-center  text-center sm:items-center ">
          <DialogPanel
            transition
            className="p-2 relative transform overflow-hidden rounded-lg bg-gray-800 text-left shadow-xl transition-all data-[closed]:translate-y-4 data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in m-4 sm:my-8 w-full sm:max-w-lg  data-[closed]:sm:translate-y-0 data-[closed]:sm:scale-95"
          >
            <div className="w-full">
              <button
                onClick={() => {
                  setOpen(false);
                }}
              >
                <XMarkIcon width={24} height={24} />
              </button>
            </div>
            <div className=" text-center  px-4 pb-4">
              <DialogTitle
                as="h1"
                className="text-2xl font-extrabold leading-6"
              >
                {title}
              </DialogTitle>
              <div className="mt-2 w-full h-full">{children}</div>
            </div>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  );
};

export default Modal;
