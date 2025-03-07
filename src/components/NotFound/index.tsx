import notFound from "@/assets/not-found.png";

interface NotFoundProps {
  label: string;
}

const NotFound = (props: NotFoundProps) => {
  const { label } = props;

  return (
    <div className="w-full flex flex-col items-center justify-center mt-20">
      <div className="flex flex-col items-center gap-8">
        <img src={notFound} alt="Not found" className="w-[120px] h-[120px]" />
        <p className="text-xl">{label}</p>
      </div>
    </div>
  );
};

export default NotFound;
