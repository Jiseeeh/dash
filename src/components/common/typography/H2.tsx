"use client";

interface H2Props {
  className?: string;
  content: string;
}

const H2: React.FC<H2Props> = ({ content, className }) => {
  return (
    <h2
      className={`scroll-m-20 pb-2 text-3xl font-semibold tracking-tight first:mt-0 ${className}`}
    >
      {content}
    </h2>
  );
};

export { H2 };
