import CategoryCard from "./CategoryCard";
import CategoryData from "./CategoryData";

function Category() {
  return (
    <section className="py-5">

      <div className="container">

        <h2 className="text-center fw-bold mb-5">
          Shop By Category
        </h2>

        <div className="row g-4">

          {CategoryData.map((item) => (
            <div className="col-lg-2 col-md-4 col-6" key={item.id}>
              <CategoryCard
                image={item.image}
                name={item.name}
              />
            </div>
          ))}

        </div>

      </div>

    </section>
  );
}

export default Category;