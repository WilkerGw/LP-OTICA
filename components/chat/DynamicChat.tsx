"use client";

import dynamic from "next/dynamic";
import { Loader2 } from "lucide-react";

const ChatWidget = dynamic(() => import("./ChatWidget"), {
    ssr: false,
    loading: () => (
        <div className="fixed bottom-6 right-6 w-14 h-14 bg-secondary rounded-full flex items-center justify-center shadow-lg animate-pulse">
            <Loader2 className="w-6 h-6 text-primary animate-spin" />
        </div>
    ),
});

export default function DynamicChat() {
    return <ChatWidget />;
}
