"use client";

import { addInterestedEvent } from "@/actions";
import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";

const ActionButtons = ({
  eventId,
  interestedUserIds,
  goingUserIds,
  fromDetails,
}) => {
  const { auth } = useAuth();
  const isUserInterested = interestedUserIds?.includes(auth?.id);
  const isUserGoing = goingUserIds?.includes(auth?.id);
  const [interested, setInterested] = useState(isUserInterested);
  const [going, setGoing] = useState(isUserGoing);
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  async function toggleInterested() {
    if (auth) {
      await addInterestedEvent(eventId, auth?.id);
      setInterested(!interested);
    } else {
      router.push("/login");
    }
  }

  function markGoing() {
    if (auth) {
      router.push(`/payment/${eventId}`);
    } else {
      router.push("/login");
    }
  }

  return (
    <div className={`w-full flex gap-4 mt-4 ${fromDetails && "flex-1"}`}>
      <button
        onClick={() => startTransition(() => toggleInterested())}
        className={`w-full ${
          interested && " bg-indigo-600 hover:bg-indigo-800"
        }`}
      >
        Interested
      </button>

      <button
        onClick={markGoing}
        className="text-center w-full bg-[#464849] py-2 px-2 rounded-md border border-[#5f5f5f]/50 shadow-sm cursor-pointer hover:bg-[#3c3d3d] transition-colors active:translate-y-1"
        disabled={auth && isUserGoing}
      >
        Going
      </button>
    </div>
  );
};

export default ActionButtons;
