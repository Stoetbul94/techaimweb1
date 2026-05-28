import { socialLinks, type SocialLinkId } from "@/lib/social";
import { cn } from "@/lib/utils";

type SocialLinksProps = {
  variant?: "footer" | "contact" | "navbar";
  className?: string;
};

function YoutubeIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M23.5 6.2a3 3 0 0 0-2.1-2.1C19.6 3.5 12 3.5 12 3.5s-7.6 0-9.4.6A3 3 0 0 0 .5 6.2 31.5 31.5 0 0 0 0 12a31.5 31.5 0 0 0 .6 5.8 3 3 0 0 0 2.1 2.1c1.8.6 9.3.6 9.3.6s7.6 0 9.4-.6a3 3 0 0 0 2.1-2.1A31.5 31.5 0 0 0 24 12a31.5 31.5 0 0 0-.5-5.8ZM9.6 15.5V8.5L15.8 12l-6.2 3.5Z" />
    </svg>
  );
}

function FacebookIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M24 12.1c0-6.6-5.4-12-12-12S0 5.5 0 12.1c0 6 4.4 11 10.1 11.9v-8.4H7.1V12h3V9.4c0-3 1.8-4.7 4.5-4.7 1.3 0 2.7.2 2.7.2v3h-1.5c-1.5 0-2 .9-2 1.9V12h3.4l-.5 3.5h-2.9v8.4C19.6 23.1 24 18.1 24 12.1Z" />
    </svg>
  );
}

const iconMap: Record<SocialLinkId, typeof YoutubeIcon> = {
  youtube: YoutubeIcon,
  facebook: FacebookIcon,
};

const variantStyles = {
  footer: {
    list: "mt-4 flex flex-wrap gap-3",
    link: "grid h-11 w-11 min-h-[44px] min-w-[44px] place-items-center border border-brand-border bg-brand-panel text-brand-text-primary transition duration-200 hover:scale-105 hover:border-brand-crimson hover:text-brand-crimson focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-crimson",
    icon: "h-5 w-5",
  },
  contact: {
    list: "mt-4 flex flex-wrap gap-3",
    link: "grid h-12 w-12 min-h-[44px] min-w-[44px] place-items-center border border-brand-border bg-brand-bg text-brand-text-primary transition duration-200 hover:scale-105 hover:border-brand-crimson hover:text-brand-crimson focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-crimson",
    icon: "h-5 w-5",
  },
  navbar: {
    list: "flex items-center gap-2",
    link: "grid h-11 w-11 min-h-[44px] min-w-[44px] place-items-center border border-brand-border text-brand-text-primary transition duration-200 hover:scale-105 hover:border-brand-crimson hover:text-brand-crimson focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-crimson",
    icon: "h-5 w-5",
  },
} as const;

export default function SocialLinks({ variant = "footer", className }: SocialLinksProps) {
  const styles = variantStyles[variant];

  return (
    <ul className={cn(styles.list, className)} role="list">
      {socialLinks.map((link) => {
        const Icon = iconMap[link.id];
        return (
          <li key={link.id}>
            <a
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={link.label}
              title={link.label}
              className={styles.link}
            >
              <Icon className={styles.icon} />
              <span className="sr-only">{link.label}</span>
            </a>
          </li>
        );
      })}
    </ul>
  );
}
