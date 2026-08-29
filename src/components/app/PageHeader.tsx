export function PageHeader({
  title,
  subtitle,
  actions,
}: {
  title: string;
  subtitle?: React.ReactNode;
  actions?: React.ReactNode;
}) {
  return (
    <div className="flex flex-wrap items-start justify-between gap-4">
      <div>
        <h1 className="text-[22px] font-extrabold tracking-[-0.5px] text-gray-900">
          {title}
        </h1>
        {subtitle && (
          <p className="mt-1 text-[13px] text-gray-600">{subtitle}</p>
        )}
      </div>
      {actions && <div className="flex gap-2">{actions}</div>}
    </div>
  );
}