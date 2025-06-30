interface PageHeaderProps {
  name: string;
  description: string;
}

export function PageHeader({ name, description }: PageHeaderProps) {
  return (
    <div className="mb-8 text-left">
      <h1 className="text-[28px] font-semibold mb-2 font-primary text-white">
        {name}
      </h1>
      <p className="text-[16px] font-normal text-gray-400">{description}</p>
    </div>
  );
}
