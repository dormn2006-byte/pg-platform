import StatCard from "../cards/StatCard";
import { stats } from "../../data/homeData";

const StatsSection = () => {
  return (
    <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16 md:px-8 md:py-20 lg:px-12">
      <div className="grid gap-6 sm:gap-8 md:grid-cols-2 xl:grid-cols-4">
        {stats.map((item) => (
          <StatCard key={item.label} stat={item} />
        ))}
      </div>
    </section>
  );
};

export default StatsSection;