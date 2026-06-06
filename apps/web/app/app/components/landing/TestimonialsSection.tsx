import React from "react";

const REVIEWS = [
  {
    quote:
      "We reduced HR administrative time by 60% in the first quarter. The wellness dashboards have completely changed how we think about employee health.",
    initials: "SR",
    name: "Sarah Reid",
    role: "Head of HR, Meridian Group",
  },
  {
    quote:
      "Compliance reporting used to take our team two full days each quarter. With Salford it's a single click. I can't overstate how much peace of mind that gives us.",
    initials: "DK",
    name: "Daniel Kim",
    role: "COO, NovaPharma Ltd.",
  },
  {
    quote:
      "Our employees genuinely engage with their health now. The personalised reminders and mobile access make it feel like a real benefit, not another admin tool.",
    initials: "AP",
    name: "Anika Patel",
    role: "People Ops Lead, Crestline",
  },
];

const StarIcon = () => (
  <svg viewBox="0 0 24 24">
    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
  </svg>
);

export default function TestimonialsSection() {
  return (
    <section className="sec t-bg" id="reviews">
      <div className="sec-inner">
        <div className="rv" style={{ textAlign: "center" }}>
          <span className="sec-lbl">Customer stories</span>
          <h2 className="sec-h" style={{ margin: "0 auto 0" }}>
            Loved by HR leaders everywhere
          </h2>
        </div>
        <div className="tgrid rv">
          {REVIEWS.map((review) => (
            <div key={review.name} className="tc">
              <div className="stars">
                {Array.from({ length: 5 }).map((_, index) => (
                  <StarIcon key={index} />
                ))}
              </div>
              <div className="tq">{review.quote}</div>
              <div className="tau">
                <div className="tav">{review.initials}</div>
                <div>
                  <div className="tnm">{review.name}</div>
                  <div className="trl">{review.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
