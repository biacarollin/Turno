export function Logo({ className = "" }: { className?: string }) {
  return (
    <span className={`inline-flex items-center gap-2 ${className}`}>
      <span className="grid grid-cols-2 gap-[2px]" aria-hidden="true">
        <span className="h-2 w-2 rounded-[2px] bg-turno-400" />
        <span className="h-2 w-2 rounded-[2px] border border-turno-400" />
        <span className="h-2 w-2 rounded-[2px] border border-turno-400" />
        <span className="h-2 w-2 rounded-[2px] bg-turno-400" />
      </span>
      <span className="text-lg font-semibold tracking-tight text-turno-400">
        Turno
      </span>
    </span>
  );
}