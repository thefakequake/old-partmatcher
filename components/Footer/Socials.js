import { FaDiscord, FaTwitter, FaYoutube, FaGithub } from "react-icons/fa"

const iconSize = "40px"

const socials = [
  {
    name: "PartMatcher Discord Server",
    url: "https://discord.gg/Qx5y8AvTeu",
    component: <FaDiscord size={iconSize} />,
  },
  {
    name: "PartMatcher Twitter",
    url: "https://twitter.com/PartMatcher",
    component: <FaTwitter size={iconSize} />,
  },
  {
    name: "PartMatcher YouTube Channel",
    url: "https://www.youtube.com/channel/UC7VVQ0BF4gOLUaeHgs-ixhQ",
    component: <FaYoutube size={iconSize} />,
  },
  {
    name: "PartMatcher GitHub",
    url: "https://github.com/PartMatcher",
    component: <FaGithub size={iconSize} />,
  },
]

export default socials
