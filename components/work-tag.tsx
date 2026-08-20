interface WorkTagProps {
  year: string;
  name: string;
  role: string;
  className?: string;
}

export function WorkTag({ year, name, role, className = "left-3 top-3" }: WorkTagProps) {
  return (
    <div
      className={`absolute z-10 flex flex-col items-start justify-center overflow-clip rounded-[5px] px-[14px] py-3 backdrop-blur-[2px] ${className}`}
    >
      <div className="flex flex-col items-start justify-center font-[family-name:var(--font-geist-mono)] text-[12px] font-normal leading-normal">
        <p className="m-0 text-[#797979]">{year}</p>
        <p className="m-0 text-[#565656]">{name}</p>
        <p className="m-0 whitespace-nowrap text-[#565656]">{role}</p>
      </div>
    </div>
  );
}
