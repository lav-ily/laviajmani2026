import { workItems } from "@/lib/projects";
import { WorkCard } from "./work-card";

export function WorkGallery() {
  const [delphi, dispo, bullpen, hopinWide, hub, hopinPhone] = workItems;

  return (
    <section
      id="work"
      className="flex w-full max-w-[1231px] scroll-mt-0 flex-col gap-6 px-4 md:mx-auto md:px-0"
    >
      {delphi ? <WorkCard item={delphi} priority /> : null}

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {dispo ? <WorkCard item={dispo} /> : null}
        {bullpen ? <WorkCard item={bullpen} /> : null}
      </div>

      {hopinWide ? <WorkCard item={hopinWide} /> : null}

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {hub ? <WorkCard item={hub} /> : null}
        {hopinPhone ? <WorkCard item={hopinPhone} /> : null}
      </div>
    </section>
  );
}
