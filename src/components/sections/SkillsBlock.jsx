export default function SkillsBlock({ block }) {
  return (
    <div className="rounded-2xl border border-border bg-secondary p-4">
      <h3 className="mb-3 font-semibold">Skills</h3>

      <div className="flex flex-wrap gap-2">
        {block.content.skills?.map((skill) => (
          <span
            key={skill}
            className="rounded-lg bg-background px-3 py-1 text-sm"
          >
            {skill}
          </span>
        ))}
      </div>
    </div>
  );
}