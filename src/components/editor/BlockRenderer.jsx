import HeroBlock from "@/components/sections/HeroBlock";
import SkillsBlock from "@/components/sections/SkillsBlock";

export default function BlockRenderer({ block }) {
  switch (block.type) {
    case "hero":
      return <HeroBlock block={block} />;

    case "skills":
      return <SkillsBlock block={block} />;

    default:
      return null;
  }
}