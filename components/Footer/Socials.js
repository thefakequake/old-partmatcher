import { FaDiscord, FaTwitter, FaYoutube, FaGithub } from "react-icons/fa"

const iconSize = "40px"

const socials = [
  {
    name: "Discord Server",
    url: "https://discord.gg/Qx5y8AvTeu",
    component: <FaDiscord size={iconSize} />,
  },
  {
    name: "Twitter",
    url: "https://twitter.com/PartMatcher",
    component: <FaTwitter size={iconSize} />,
  },
  {
    name: "YouTube Channel",
    url: "https://www.youtube.com/channel/UC7VVQ0BF4gOLUaeHgs-ixhQ",
    component: <FaYoutube size={iconSize} />,
  },
  {
    name: "GitHub",
    url: "https://github.com/QuaKe8782/partmatcher",
    component: <FaGithub size={iconSize} />,
  },
]

export default socials
