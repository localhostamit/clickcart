import BannerCard from "./BannerCard";
function BannerSection() {
  return (
    <section className="py-5">
      <div className="container">
        <div className="row g-4">
          {/* Fashion Banner */}
          <div className="col-lg-6">
            <BannerCard
              title="Summer Collection"
              subtitle="Up to 50% OFF on Fashion"
              button="Shop Now"
              image="https://picsum.photos/350/250?10"
              link="/products?category=Fashion"
            />
          </div>
          {/* Electronics Banner */}
          <div className="col-lg-6">
            <BannerCard
              title="Latest Electronics"
              subtitle="Save up to 30% Today"
              button="Explore"
              image="https://picsum.photos/350/250?20"
              link="/products?category=Electronics"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
export default BannerSection;