import type { ReactNode } from "react";

type MobileDemoSheetProps = {
  children: ReactNode;
  open: boolean;
  onClose: () => void;
};

export function MobileDemoSheet({ children, open, onClose }: MobileDemoSheetProps) {
  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 overflow-hidden bg-black/35"
      onClick={onClose}
      aria-hidden="true"
    >
      <div
        className="demo-mobile-sheet fixed inset-x-0 bottom-0 mx-auto flex h-[92dvh] max-h-[92dvh] w-full max-w-[100vw] min-w-0 flex-col overflow-hidden rounded-t-[28px] bg-white shadow-2xl"
        onClick={(event) => event.stopPropagation()}
      >
        {children}
      </div>
    </div>
  );
}
