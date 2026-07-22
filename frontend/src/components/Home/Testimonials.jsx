import Container from "../../layouts/Container";

const testimonials = [
  {
    quote:
      "Dormn made finding my PG in Bangalore incredibly easy. The filters helped me narrow down options quickly, and I could contact the owner directly via WhatsApp. No more running around the city!",
    author: "Priya S.",
    role: "Student, Bangalore",
    avatar: "🎓",
  },
  {
    quote:
      "As a PG owner, Dormn's dashboard saves me hours every week. I can manage all my booking requests in one place and update my listings whenever needed.",
    author: "Rajesh K.",
    role: "Property Owner, Hyderabad",
    avatar: "🏢",
  },
];

const Testimonials = () => {
  return (
    <section className="bg-white px-4 py-16 sm:px-6 lg:px-8 border-b border-gray-100">
      <Container max-w-4xl>
        <div className="mb-12 text-center">
          <p className="text-[11px] font-bold uppercase tracking-[0.25em] text-[#E56A54]">
            Community Feedback
          </p>
          <h2 className="mt-3 text-3xl font-black tracking-tight text-[#3A2935] sm:text-4xl md:text-5xl">
            What Our Users Say
          </h2>
        </div>

        {/* Point-Wise Vertical List */}
        <div className="space-y-4 max-w-3xl mx-auto">
          {testimonials.map((item, index) => (
            <div
              key={item.author}
              className="flex flex-col sm:flex-row sm:items-center gap-5 rounded-3xl border-2 border-gray-100 bg-[#FAF9F5]/70 p-6 sm:p-8 transition-all hover:border-[#E56A54]/30 hover:bg-white hover:shadow-sm"
            >
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-orange-50 text-2xl border border-orange-100">
                {item.avatar}
              </div>

              <div>
                <p className="text-xs sm:text-sm font-medium leading-relaxed text-gray-700 italic mb-3">
                  &quot;{item.quote}&quot;
                </p>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-black text-[#3A2935]">{item.author}</span>
                  <span className="text-gray-300">•</span>
                  <span className="text-xs font-bold text-[#E56A54]">{item.role}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
};

export default Testimonials;
