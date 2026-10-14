export default function SearchWidget() {
  return (
    <section className="relative z-30 -mt-16 px-4 sm:-mt-20 lg:-mt-28 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl">
        {/* Title strip with curved joint */}
        <div className="relative z-10 w-full sm:w-fit">
          <div className="flex w-full items-center rounded-t-[26px] bg-white/95 px-5 pb-2 pt-4 backdrop-blur sm:w-fit sm:px-8">
            <h2 className="text-base font-bold text-[#17365d] sm:text-lg">
              Explore China & Beyond
            </h2>
          </div>

          {/* concave curve between title strip and card */}
          <span
            aria-hidden="true"
            className="pointer-events-none absolute -right-6 bottom-0 hidden h-6 w-6 bg-[radial-gradient(circle_at_100%_0,transparent_24px,rgba(255,255,255,0.95)_24.5px)] sm:block"
          />
        </div>

        {/* Card */}
        <div className="relative -mt-px rounded-[26px] rounded-tl-none bg-white/95 p-4 shadow-[0_12px_40px_rgba(30,100,160,0.15)] backdrop-blur sm:p-5 md:px-6 md:py-5">
          <p className="text-sm leading-relaxed text-slate-600 sm:text-base">
            Great Wall-er sunrise theke Bangkok-er street food, Dubai-er
            skyline theke Bali-r sea beach, amader carefully planned tour
            package diye apnar porer journey hobe ekdom smooth ar
            memorable. Visa processing, hotel, transport, guide, shob kichu
            amra dekhe nibo, apni shudhu ghurte jaben.
          </p>
        </div>
      </div>
    </section>
  )
}