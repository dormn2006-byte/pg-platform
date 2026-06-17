import PGCard from "../cards/PGCard";
import ListingSlider from "./ListingSlider";
import Container from "../../layouts/Container";
import { Link } from "react-router-dom";


const FeaturedListings = ({ featuredPGs = [], loading = false }) => {
  return (
    <section className="overflow-hidden py-14 sm:py-16 md:py-20 lg:py-24">
      {/* Heading */}
      <Container className="mb-8 sm:mb-10 md:mb-14">
        <div className="flex flex-col gap-4 sm:gap-5 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-cyan-300 sm:text-sm sm:tracking-[0.25em]">
              Featured Listings
            </p>

            <h2 className="mt-3 text-3xl font-black tracking-tight text-white sm:text-4xl md:mt-4 md:text-6xl">
              Popular PGs Near You
            </h2>

            <p className="mt-3 max-w-2xl text-sm leading-6 text-gray-300 sm:mt-4 sm:text-base sm:leading-7 md:mt-5 md:text-lg md:leading-8">
              Explore premium student accommodations with verified listings, modern amenities and easy owner connectivity.
            </p>
          </div>

          <Link
            to="/explore"
            className="w-full rounded-2xl border border-white/10 bg-white/5 px-5 py-3 text-center text-sm font-semibold text-white backdrop-blur-xl transition duration-300 hover:bg-white/10 sm:w-auto sm:px-7 sm:py-4"
          >
            View All Listings
          </Link>
        </div>
      </Container>

      {/* Cards */}
      <Container className="pl-3 sm:pl-4 md:px-8 lg:px-12">
        <ListingSlider>
          {loading ? (
            <div className="px-3 text-sm text-white sm:px-4">Loading PG listings...</div>
          ) : featuredPGs.length > 0 ? (
            featuredPGs.map((pg) => (
              <PGCard key={pg.id} pg={pg} />
            ))
          ) : (
            <div className="px-3 text-sm text-gray-400 sm:px-4">No approved PGs available.</div>
          )}
        </ListingSlider>
      </Container>
    </section>
  );
};

export default FeaturedListings;