import { Button } from "@nextui-org/react";

// Import all icons with updated file names
import {
  GithubIcon,
  FrontendMentorIcon,
  TwitterIcon,
  LinkedinIcon,
  YoutubeIcon,
  FacebookIcon,
  TwitchIcon,
  DevtoIcon,
  CodewarsIcon,
  CodepenIcon,
  FreeCodeCampIcon,
  GitlabIcon,
  HashnodeIcon,
  StackOverflowIcon,
} from "../components/Icons/SocialIcons.tsx";

const iconComponents: any = {
  Github: GithubIcon,
  "Frontend Mentor": FrontendMentorIcon,
  Twitter: TwitterIcon,
  Linkedin: LinkedinIcon,
  Youtube: YoutubeIcon,
  Facebook: FacebookIcon,
  Twitch: TwitchIcon,
  "Dev.to": DevtoIcon,
  Codewars: CodewarsIcon,
  Codepen: CodepenIcon,
  freeCodeCamp: FreeCodeCampIcon,
  Gitlab: GitlabIcon,
  Hashnode: HashnodeIcon,
  "Stack Overflow": StackOverflowIcon,
};

const iconStyles: any = {
  Github: "bg-[#1A1A1A] text-white font-normal",
  "Frontend Mentor": "bg-white border border-divider text-black font-normal",
  Twitter: "bg-[#43B7E9] text-white font-normal",
  Linkedin: "bg-[#2D68FF] text-white font-normal",
  Youtube: "bg-[#EE3939] text-white font-normal",
  Facebook: "bg-[#2442AC] text-white font-normal",
  Twitch: "bg-[#EE3FC8] text-white font-normal",
  "Dev.to": "bg-[#333333] text-white font-normal",
  Codewars: "bg-[#8A1A50] text-white font-normal",
  Codepen: "bg-black text-white font-normal",
  freeCodeCamp: "bg-[#302267] text-white font-normal",
  Gitlab: "bg-[#EB4925] text-white font-normal",
  Hashnode: "bg-[#0330D1] text-white font-normal",
  "Stack Overflow": "bg-[#EC7100] text-white font-normal",
};

function formatLink(link: string) {
  // Add protocol if missing
  if (!/^https?:\/\//i.test(link)) {
    link = `https://${link}`;
  }
  // Add www. if missing
  if (!/^https?:\/\/www\./i.test(link)) {
    link = link.replace(/^https?:\/\//i, "$&www.");
  }
  return link;
}

function SocialButton({ platform, link }: { platform: string; link: string }) {
  const formattedLink = formatLink(link);
  const Styles: string = iconStyles[platform] || "";
  const IconComponent = iconComponents[platform] || null;

  return (
    <a href={formattedLink} target="_blank" rel="noopener noreferrer">
      <Button
        className={`w-[237px] h-[56px] rounded-lg ${Styles} flex justify-between`}
      >
        <div className="flex gap-4">
          {IconComponent && <IconComponent fillColor="white" />}
          <p>{platform}</p>
        </div>
        <div>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill={platform === "Frontend Mentor" ? "black" : "white"}
            viewBox="0 0 16 16"
          >
            <path
              fill={platform === "Frontend Mentor" ? "black" : "white"}
              d="M2.667 7.333v1.334h8L7 12.333l.947.947L13.227 8l-5.28-5.28L7 3.667l3.667 3.666h-8Z"
            />
          </svg>
        </div>
      </Button>
    </a>
  );
}

export default SocialButton;
