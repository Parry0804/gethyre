import { cx } from "@/components/ui";
import { industries, roles } from "@/content/roles";

/**
 * Home page: two rows of target roles drifting in opposite directions.
 * Pauses on hover. Turns into a swipeable row when the visitor prefers reduced motion.
 */
export function RoleMarquee() {
  // Deal roles out industry by industry so neighbours come from different fields.
  const groups = Object.keys(industries).map((k) => roles.filter((r) => r.industry === k));
  const mixed: typeof roles = [];
  for (let i = 0; mixed.length < roles.length; i++) groups.forEach((g) => g[i] && mixed.push(g[i]));
  const rows = [mixed.filter((_, i) => i % 2 === 0), mixed.filter((_, i) => i % 2 === 1)];

  return (
    <div className="mt-8 flex flex-col gap-3 lg:mt-10 lg:gap-4">
      <ul className="sr-only">
        {roles.map((r) => (
          <li key={r.name}>{r.name}</li>
        ))}
      </ul>
      {rows.map((row, i) => (
        <div
          key={i}
          aria-hidden
          className="gh-marquee group relative overflow-hidden [mask-image:linear-gradient(90deg,transparent,#000_8%,#000_92%,transparent)]"
        >
          <div className={cx("gh-marquee-track flex w-max gap-3 group-hover:[animation-play-state:paused]", i === 1 && "[animation-direction:reverse]")}>
            {[...row, ...row].map((r, j) => (
              <span
                key={`${r.name}-${j}`}
                className="flex shrink-0 items-center gap-2.5 rounded-full border border-line bg-white px-4 py-2.5 text-[14px] font-semibold text-ink shadow-sm lg:px-5 lg:py-3 lg:text-[15px]"
              >
                <span className={cx("size-2 rounded-full", industries[r.industry])} />
                {r.name}
                <span className="text-[12px] font-medium text-muted">{r.industry}</span>
              </span>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
