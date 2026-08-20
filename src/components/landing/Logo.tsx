export function Logo({
  className = "",
  variant = "light",
}: {
  className?: string;
  variant?: "light" | "dark";
}) {
  const dark = variant === "dark";
  return (
    <span className={`inline-flex items-center gap-2 ${className}`}>
      <span className="grid grid-cols-3 gap-[2px]" aria-hidden="true">
        {Array.from({ length: 9 }).map((_, i) => (
          <span
            key={i}
            className={`h-[6px] w-[6px] rounded-[1.5px] ${
              i % 2 === 0
                ? dark
                  ? "bg-app-400"
                  : "bg-turno-400"
                : dark
                ? "bg-app-300"
                : "bg-turno-300"
            }`}
          />
        ))}
      </span>
      <span
        className={`text-lg font-semibold tracking-tight ${
          dark ? "text-white" : "text-turno-400"
        }`}
      >
        {dark ? "turno" : "Turno"}
      </span>
    </span>
  );
}
