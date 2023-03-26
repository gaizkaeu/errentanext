"use client";
import {
  Dispatch,
  SetStateAction,
  useCallback,
  useMemo,
  useState,
} from "react";
import { UIEvent } from "react";
import Modal from "./modal-test";
import { useRouter } from "next/navigation";

function StatsModalHelper({
  showStatsModal,
  setShowStatsModal,
}: {
  showStatsModal: boolean;
  setShowStatsModal: Dispatch<SetStateAction<boolean>>;
}) {
  const router = useRouter();
  const [atModalTop, setAtModalTop] = useState(false);

  const handleScroll = (event: UIEvent<HTMLElement>) => {
    if (event.currentTarget.scrollTop > 144) {
      setAtModalTop(true);
    } else {
      setAtModalTop(false);
    }
  };

  return (
    <Modal
      showModal={showStatsModal}
      setShowModal={setShowStatsModal}
      bgColor="bg-gray-50 dark:bg-midnight"
    >
      <div
        onScroll={handleScroll}
        className="inline-block max-h-[calc(100vh-150px)] w-full max-w-screen-xl transform overflow-scroll bg-gray-50 dark:bg-midnight
        align-middle shadow-xl scrollbar-hide sm:rounded-2xl sm:border sm:border-gray-200"
      >
        asjhkdajkshdahjks
        <button
          className="group sticky top-4 right-4 z-30 float-right hidden rounded-full p-3 transition-all duration-75 hover:bg-gray-100 focus:outline-none active:scale-75 sm:block"
          autoFocus={false}
          onClick={() => {
            router.push("/");
          }}
        >
          salir
        </button>
      </div>
    </Modal>
  );
}

export function useStatsModal() {
  const [showStatsModal, setShowStatsModal] = useState(false);

  const StatsModal = useCallback(() => {
    return (
      <StatsModalHelper
        showStatsModal={showStatsModal}
        setShowStatsModal={setShowStatsModal}
      />
    );
  }, [showStatsModal, setShowStatsModal]);

  return useMemo(
    () => ({ setShowStatsModal, StatsModal }),
    [setShowStatsModal, StatsModal],
  );
}