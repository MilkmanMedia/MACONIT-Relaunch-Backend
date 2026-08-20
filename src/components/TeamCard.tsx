import Image from "next/image";
import type { TeamMember, MediaDoc } from "@/lib/types";

export function TeamCard({ member }: { member: TeamMember }) {
  const photo = typeof member.photo === "object" && member.photo ? (member.photo as MediaDoc) : null;

  return (
    <div className="text-center transition-transform duration-300 hover:-translate-y-1">
      <div className="mb-3 flex aspect-square items-center justify-center rounded border border-dashed border-gray-300 bg-gradient-to-br from-gray-100 to-gray-200 text-sm text-grey-light">
        {photo?.url ? (
          <Image src={photo.url} alt={photo.alt || member.name} width={300} height={300} className="h-full w-full rounded object-cover" />
        ) : (
          "Foto"
        )}
      </div>
      <h4 className="text-base font-bold">{member.name}</h4>
      <div className="text-[13px] font-bold text-primary">{member.role}</div>
    </div>
  );
}
