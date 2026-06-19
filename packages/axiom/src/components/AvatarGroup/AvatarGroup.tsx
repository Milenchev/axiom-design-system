import { Avatar, Tooltip } from "@mantine/core";

export interface AvatarGroupItem {
  /** Full name — used for the tooltip and the fallback initials */
  name: string;
  /** Avatar image URL */
  src?: string;
  /** Fallback background colour when no image is provided */
  color?: string;
}

export interface AvatarGroupProps {
  /** People to display */
  avatars: AvatarGroupItem[];
  /** Maximum number of avatars shown before collapsing into a +N counter */
  max?: number;
  /** Avatar size */
  size?: number | string;
  /** Avatar radius */
  radius?: number | string;
  /** Show a tooltip with the person's name on hover */
  withTooltip?: boolean;
}

const initials = (name: string) =>
  name
    .split(" ")
    .map((part) => part[0])
    .filter(Boolean)
    .slice(0, 2)
    .join("")
    .toUpperCase();

export const AvatarGroup = ({
  avatars,
  max = 4,
  size = 32,
  radius = "xl",
  withTooltip = true,
}: AvatarGroupProps) => {
  const visible = avatars.slice(0, max);
  const overflow = avatars.length - visible.length;

  return (
    <Avatar.Group>
      {visible.map((person, index) => {
        const avatar = (
          <Avatar
            // biome-ignore lint/suspicious/noArrayIndexKey: names may repeat, index keeps order stable
            key={`${person.name}-${index}`}
            src={person.src}
            color={person.color}
            radius={radius}
            size={size}
          >
            {initials(person.name)}
          </Avatar>
        );

        return withTooltip ? (
          <Tooltip
            // biome-ignore lint/suspicious/noArrayIndexKey: names may repeat, index keeps order stable
            key={`${person.name}-${index}`}
            label={person.name}
            withArrow
          >
            {avatar}
          </Tooltip>
        ) : (
          avatar
        );
      })}

      {overflow > 0 && (
        <Avatar radius={radius} size={size}>
          +{overflow}
        </Avatar>
      )}
    </Avatar.Group>
  );
};

AvatarGroup.displayName = "AvatarGroup";
