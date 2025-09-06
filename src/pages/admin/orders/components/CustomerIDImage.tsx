interface CustomerIDImageProps {
  label: string;
  imageSrc: string;
  imageAlt: string;
  downloadHandler: () => void;
}

export const CustomerIDImage: React.FC<CustomerIDImageProps> = ({
  label,
  imageSrc,
  imageAlt,
  downloadHandler,
}) => {
  const BASE_URL = import.meta.env.VITE_APP_BASE_URL;

  const style = {
    detailLabel: "text-gray-500 text-sm max-sm:text-xs",
  };

  return (
    <div className="flex flex-col justify-center gap-2">
      <p className={style.detailLabel}>{label}</p>
      <img
        src={`${BASE_URL}${imageSrc}`}
        alt={imageAlt}
        className="w-[100px] h-fit max-h-[250px] mx-auto"
        loading="lazy"
      />
      <button
        onClick={downloadHandler}
        className="bg-green-600 px-2 rounded text-white hover:bg-green-700 transition-colors"
        type="button"
      >
        Download
      </button>
    </div>
  );
};
