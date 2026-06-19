import type React from "react";
import { useId } from "react";

interface IconProps extends React.SVGProps<SVGSVGElement> {
  size?: number | string;
}

export const AiIcon = ({ size = 24, ...props }: IconProps) => {
  const id = useId();
  const filter0 = `${id}_ai_filter0`;
  const filter1 = `${id}_ai_filter1`;
  const gradient = `${id}_ai_gradient`;

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 30 30"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <title>AI</title>
      <g filter={`url(#${filter0})`}>
        <g filter={`url(#${filter1})`}>
          <ellipse cx="15" cy="15" rx="15" ry="15" fill={`url(#${gradient})`} />
        </g>
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M20.7613 6.46736C21.1339 7.59613 21.4403 7.90321 22.5666 8.27671C23.0552 8.4427 23.0552 9.11498 22.5666 9.28097C21.4403 9.65446 21.1339 9.96156 20.7613 11.0903C20.5957 11.58 19.9248 11.58 19.7592 11.0903C19.3866 9.96156 19.0802 9.65446 17.9539 9.28097C17.7138 9.20628 17.5895 8.99878 17.5895 8.78299C17.5895 8.5672 17.7138 8.3597 17.9539 8.27671C19.0802 7.90321 19.3866 7.59613 19.7592 6.46736C19.9248 5.97768 20.5957 5.97768 20.7613 6.46736ZM17.8736 14.7083L19.5381 15.1896V15.1813C20.0184 15.3224 20.358 15.7706 20.358 16.2769C20.358 16.7832 20.0184 17.2314 19.5299 17.3724L17.8653 17.8456C16.6065 18.2107 15.6376 19.1735 15.2815 20.4351L14.8012 22.1033C14.6604 22.5764 14.2298 22.9001 13.708 22.9001C13.1863 22.9001 12.7557 22.5847 12.6149 22.1033L12.1346 20.4351C11.7702 19.1735 10.8096 18.2024 9.55081 17.8456L7.88626 17.3641C7.40594 17.223 7.06641 16.7749 7.06641 16.2686C7.06641 15.7623 7.40594 15.3141 7.89454 15.173L9.5591 14.7C10.8179 14.3348 11.7868 13.372 12.1429 12.1104L12.6232 10.4422C12.764 9.96078 13.2111 9.62049 13.7163 9.62049C14.2215 9.62049 14.6687 9.96078 14.8094 10.4422L15.2898 12.1187C15.6542 13.3803 16.6148 14.3513 17.8736 14.7083Z"
          fill="white"
        />
      </g>
      <defs>
        <filter
          id={filter0}
          x="0"
          y="-0.3"
          width="30"
          height="31.3"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="BackgroundImageFix"
            result="shape"
          />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset dy="1" />
          <feGaussianBlur stdDeviation="0.5" />
          <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 1 0 0 0 0 0.559912 0 0 0 0 0.241227 0 0 0 0.22 0"
          />
          <feBlend mode="normal" in2="shape" result="effect1_innerShadow" />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset dy="-1" />
          <feGaussianBlur stdDeviation="0.15" />
          <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0.0378792 0 0 0 0 0.378792 0 0 0 0.18 0"
          />
          <feBlend
            mode="normal"
            in2="effect1_innerShadow"
            result="effect2_innerShadow"
          />
        </filter>
        <filter
          id={filter1}
          x="0"
          y="-0.3"
          width="30"
          height="31.3"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="BackgroundImageFix"
            result="shape"
          />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset dy="1" />
          <feGaussianBlur stdDeviation="0.5" />
          <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 1 0 0 0 0 0.559912 0 0 0 0 0.241227 0 0 0 0.22 0"
          />
          <feBlend mode="normal" in2="shape" result="effect1_innerShadow" />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset dy="-1" />
          <feGaussianBlur stdDeviation="0.15" />
          <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0.0378792 0 0 0 0 0.378792 0 0 0 0.18 0"
          />
          <feBlend
            mode="normal"
            in2="effect1_innerShadow"
            result="effect2_innerShadow"
          />
        </filter>
        <linearGradient
          id={gradient}
          x1="28.0167"
          y1="28.1789"
          x2="3.7762"
          y2="3.16756"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0.015625" stopColor="#26A9D3" />
          <stop offset="0.235" stopColor="#0B3CEA" />
          <stop offset="0.43" stopColor="#3D17DC" />
          <stop offset="0.65" stopColor="#611096" />
          <stop offset="0.87" stopColor="#A82C35" />
          <stop offset="1" stopColor="#FF7E3B" />
        </linearGradient>
      </defs>
    </svg>
  );
};

AiIcon.displayName = "AiIcon";
