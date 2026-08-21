import Image from "next/image";
import type { TeamMember, MediaDoc } from "@/lib/types";

export function TeamCard({ member }: { member: TeamMember }) {
  const photo = typeof member.photo === "object" && member.photo ? (member.photo as MediaDoc) : null;

  return (
    <div className="relative bg-bg-alt p-7 transition-all duration-200 ease-out hover:z-10 hover:-translate-y-[3px] hover:shadow-lift">
      <div
        className="mb-4 flex aspect-square items-center justify-center border border-line font-mono text-[11px] text-grey-light"
        style={
          photo?.url
            ? undefined
            : {
                backgroundImage:
                  "repeating-linear-gradient(135deg, #eeede9 0, #eeede9 10px, #e6e4df 10px, #e6e4df 20px)",
              }
        }
      >
        {photo?.url ? (
          <Image
            src={photo.url}
            alt={photo.alt || member.name}
            width={300}
            height={300}
            className="h-full w-full object-cover"
          />
        ) : (
          "Foto"
        )}
      </div>
      <h4 className="mb-0.5 text-[15px] font-bold">{member.name}</h4>
      <div className="text-[13px] font-bold text-primary">{member.role}</div>
    </div>
  );
}
