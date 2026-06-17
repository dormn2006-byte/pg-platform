

const StatCard = ({ stat }) => {
  return (
    <div className="group relative overflow-hidden rounded-[2.5rem] border border-white/10 bg-white/5 p-8 shadow-2xl backdrop-blur-2xl transition duration-300 hover:-translate-y-1 hover:bg-white/[0.07]">
      {/* Glow Effect */}
      <div
        className={`absolute -right-10 -top-10 h-40 w-40 rounded-full bg-gradient-to-br ${stat.gradient} opacity-10 blur-3xl transition duration-500 group-hover:opacity-20`}
      ></div>

      {/* Content */}
      <div className="relative z-10">
        {/* Number */}
        <h3
          className={`bg-gradient-to-r ${stat.gradient} bg-clip-text text-5xl font-black text-transparent md:text-6xl`}
        >
          {stat.number}
        </h3>

        {/* Label */}
        <p className="mt-4 text-2xl font-black tracking-tight text-white">
          {stat.label}
        </p>

        {/* Description */}
        <p className="mt-4 text-base leading-7 text-gray-300">
          {stat.description}
        </p>
      </div>
    </div>
  );
};

export default StatCard;