interface DetailWrapperProps {
  icon: React.ComponentType<any>;
  heading: string;
  children: React.ReactNode;
}

export const DetailWrapper: React.FC<DetailWrapperProps> = ({
  icon: Icon,
  heading,
  children,
}) => {
  const style = {
    detailDiv: "flex items-start gap-2",
    detailIcon:
      "rounded-full bg-secondary-light p-3 max-sm:p-[7px] text-lg max-sm:text-sm",
    detailHeading: "text-2xl text-start max-sm:text-lg",
    detailSubDiv: "flex flex-col",
  };

  return (
    <div className={style.detailDiv}>
      <div className={style.detailIcon}>
        <Icon />
      </div>
      <div className={style.detailSubDiv}>
        <h3 className={style.detailHeading}>{heading}</h3>
        <div className={style.detailSubDiv}>{children}</div>
      </div>
    </div>
  );
};

interface DetailDivProps {
  label: string;
  text: React.ReactNode;
}

export const DetailDiv: React.FC<DetailDivProps> = ({ label, text }) => {
  const wideContent = label === "Address" || label === "Cancel Reason";
  const style = {
    detailWrapper: `flex ${wideContent ? "items-start" : "items-center"} gap-1`,
    detailLabel: "text-gray-500 text-sm max-sm:text-xs",
    detailText: "text-[16px] max-sm:text-sm text-wrap max-sm:max-w-[200px]",
  };

  return (
    <div className={style.detailWrapper}>
      <span className={style.detailLabel}>{label}:</span>
      <span className={style.detailText}>{text}</span>
    </div>
  );
};
