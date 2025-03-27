type LogoIconProps = { color: string };

export const LogoIcon = ({ color }: LogoIconProps) => {
  return (
    <svg
      width="18"
      height="19"
      viewBox="0 0 18 19"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M4.83366 1.16675V17.8334M13.167 1.16675V17.8334M0.666992 9.50008H17.3337M0.666992 5.33341H4.83366M0.666992 13.6667H4.83366M13.167 13.6667H17.3337M13.167 5.33341H17.3337M2.48366 1.16675H15.517C16.5203 1.16675 17.3337 1.9801 17.3337 2.98341V16.0167C17.3337 17.0201 16.5203 17.8334 15.517 17.8334H2.48366C1.48034 17.8334 0.666992 17.0201 0.666992 16.0167V2.98341C0.666992 1.9801 1.48034 1.16675 2.48366 1.16675Z"
        stroke={color}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};
