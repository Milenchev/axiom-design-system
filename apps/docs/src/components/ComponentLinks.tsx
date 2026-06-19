import { FIGMA_URL, STORYBOOK_URL } from "@/config/constants";
import {
  FigmaIcon,
  GithubIcon,
  MantineIcon,
  StorybookIcon,
} from "./CustomIcons";

interface ComponentLinksMeta {
  figma?: boolean | string;
  storybook?: string;
  mantine?: string;
  source?: string;
}

export interface ComponentLinksProps {
  links?: ComponentLinksMeta;
}

const ButtonLink = ({
  children,
  href,
  startContent,
  ...props
}: React.HTMLProps<HTMLAnchorElement> & {
  startContent?: React.ReactNode;
}) => {
  return (
    <a
      className={"flex relative gap-2 items-center"}
      href={href}
      rel="noopener noreferrer"
      target="_blank"
      {...props}
    >
      {startContent}
      {children}
    </a>
  );
};

const generateComponentLinks = (links: ComponentLinksMeta) => {
  return {
    figma: links.figma ? FIGMA_URL : null,
    storybook: links.storybook
      ? `${STORYBOOK_URL}/?path=/docs/${links.storybook}`
      : null,
    mantine: links.mantine ? links.mantine : null,
    source: links.source
      ? `https://github.com/gmilenchev/axiom-design-system/tree/main/packages/${links.source}`
      : null,
  };
};

export const ComponentLinks = ({ links }: ComponentLinksProps) => {
  const componentLinks = generateComponentLinks(links || {});

  if (!componentLinks) {
    return null;
  }

  return (
    <div className="mt-4 mb-4 flex flex-wrap gap-6">
      {/* Only the node-id is needed */}
      {componentLinks.figma ? (
        <ButtonLink
          href={componentLinks.figma}
          startContent={
            <FigmaIcon className="text-lg" style={{ height: 16 }} />
          }
        >
          Figma
        </ButtonLink>
      ) : null}
      {componentLinks.storybook ? (
        <ButtonLink
          href={`${componentLinks.storybook}`}
          startContent={<StorybookIcon className="text-lg text-[#ff4785]" />}
        >
          Storybook
        </ButtonLink>
      ) : null}
      {componentLinks.mantine ? (
        <ButtonLink
          href={`${componentLinks.mantine}`}
          startContent={
            <MantineIcon
              className="text-lg text-[#ff4785]"
              style={{ height: 18 }}
            />
          }
        >
          Mantine
        </ButtonLink>
      ) : null}
      {componentLinks.source ? (
        <ButtonLink
          href={componentLinks.source}
          startContent={<GithubIcon size={20} />}
        >
          Source
        </ButtonLink>
      ) : null}
    </div>
  );
};
