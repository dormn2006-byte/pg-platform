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
    <section className="bg-[#FAF9F5] px-4 py-16 sm:px-6 lg:px-8">
      <Container max-w-5xl>
        <div className="mb-12 text-center">
          <p className="text-[11px] font-bold uppercase tracking-[0.25em] text-[#E56A54]">
            Community Feedback
          </p>
          <h2 className="mt-3 text-3xl font-black tracking-tight text-[#3A2935] sm:text-4xl md:text-5xl">
            What Our Users Say
          </h2>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {testimonials.map((item) => (
            <div
              key={item.author}
              className="flex flex-col justify-between rounded-[2.5rem] border-2 border-gray-100 bg-white p-8 shadow-sm transition-all hover:border-[#E56A54]/30 hover:shadow-md"
            >
              <div className="mb-6">
                <div className="text-3xl mb-4 text-[#E56A54]">“</div>
                <p className="text-sm sm:text-base font-medium leading-relaxed text-gray-700 italic">
                  {item.quote}
                </p>
              </div>

              <div className="flex items-center gap-3 pt-4 border-t border-gray-100">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-orange-50 text-xl">
                  {item.avatar}
                </div>
                <div>
                  <h3 className="text-sm font-black text-[#3A2935]">
                    {item.author}
                  </h3>
                  <p className="text-xs font-bold text-[#E56A54]">
                    {item.role}
                  </p>
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
