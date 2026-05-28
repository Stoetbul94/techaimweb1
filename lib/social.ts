export const socialLinks = [
  {
    id: "youtube",
    href: "https://www.youtube.com/@TechAimTargets",
    label: "Tech Aim on YouTube",
  },
  {
    id: "facebook",
    href: "https://www.facebook.com/profile.php?id=61558986698941",
    label: "Tech Aim on Facebook",
  },
] as const;

export type SocialLinkId = (typeof socialLinks)[number]["id"];
