import type React from "react";
import { useId } from "react";

interface IconProps extends React.SVGProps<SVGSVGElement> {
  size?: number | string;
}

export const HomeIcon = ({ size = 24, ...props }: IconProps) => {
  const gradientId = `${useId()}_home_gradient`;
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <title>Home</title>
      <path
        d="M0 4C0 1.79086 1.79086 0 4 0H36C38.2091 0 40 1.79086 40 4V36C40 38.2091 38.2091 40 36 40H4C1.79086 40 0 38.2091 0 36V4Z"
        fill={`url(#${gradientId})`}
      />
      <path
        d="M4 0.5H36C37.933 0.5 39.5 2.067 39.5 4V36C39.5 37.933 37.933 39.5 36 39.5H4C2.067 39.5 0.5 37.933 0.5 36V4C0.500001 2.067 2.067 0.5 4 0.5Z"
        stroke="#060606"
        strokeOpacity="0.2"
      />
      <path
        d="M21.0197 8.40082C20.443 7.86639 19.5523 7.86639 18.9803 8.40082L8.47846 18.1518C8.02838 18.5737 7.87835 19.2253 8.10339 19.7972C8.32843 20.3692 8.87696 20.7489 9.49582 20.7489H10.246V28.9997C10.246 30.6546 11.5915 32 13.2465 32H26.7488C28.4038 32 29.7494 30.6546 29.7494 28.9997V20.7489H30.4995C31.1183 20.7489 31.6716 20.3692 31.8966 19.7972C32.1216 19.2253 31.9716 18.569 31.5215 18.1518L21.0197 8.40082ZM19.2475 22.9991H20.7478C21.9902 22.9991 22.9982 24.007 22.9982 25.2493V29.7498H16.9971V25.2493C16.9971 24.007 18.0051 22.9991 19.2475 22.9991Z"
        fill="white"
      />
      <defs>
        <linearGradient
          id={gradientId}
          x1="2.5"
          y1="1.25"
          x2="37.5"
          y2="38.75"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#475862" />
          <stop offset="1" stopColor="#1C2328" />
        </linearGradient>
      </defs>
    </svg>
  );
};

HomeIcon.displayName = "HomeIcon";
