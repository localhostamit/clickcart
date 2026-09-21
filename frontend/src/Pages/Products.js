import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import ProductCard from "../Components/PRODUCT/ProductCard";
import API_URL from "../services/api";
function Products() {
    const [search, setSearch] = useState("");
    const [categories, setCategories] = useState(["All"]);
    const[products ,setProducts] = useState([]);
const [searchParams] = useSearchParams();
const urlCategory = searchParams.get("category");
const [category, setCategory] = useState(
  urlCategory || "All"
);
useEffect(() => {
  setCategory(urlCategory || "All");
}, [urlCategory]);
useEffect(() => {
  const fetchCategories = async () => {
    try {
      const response = await fetch(`${API_URL}/api/categories`);
      const data = await response.json();

      if (data.success) {
        const categoryNames = data.categories.map(
          (category) => category.name
        );

        setCategories(["All", ...categoryNames]);
      }
    } catch (error) {
      console.error("Failed to fetch categories:", error);
    }
  };

  fetchCategories();
}, []);
useEffect(()=> {
  const fetchProducts = async () =>{
    try{
      const response = await fetch(`${API_URL}/api/products`);
      const data =await response.json();
      if(data.success){
        const formatedProducts = data.products.map((product)=>({
          id : product._id,
          title : product.name,
          price:product.price,
          description : product.description,
          stock : product.stock,
          image : product.image,
          category : product.category?.name || "",
        }));
        setProducts(formatedProducts);
      }
    }
    catch(error){
      console.error("failed to fetch products",error);
    }
  };
  fetchProducts();
},[]
);
 
  const filteredProducts = products.filter((product) => {
    const matchSearch = product.title
      .toLowerCase()
      .includes(search.toLowerCase());
    const matchCategory =
      category === "All" || product.category === category;
    return matchSearch && matchCategory;
  });
  return (
    <>
      {/* Page Header */}
      <section className="bg-light py-5">
        <div className="container">
          <h1 className="fw-bold">All Products</h1>
          <p className="text-muted mb-0">
            Find the best products at the best prices.
          </p>
        </div>
      </section>
      {/* Products */}
      <section className="py-5">
        <div className="container">
          <div className="row">
            {/* Sidebar */}
            <div className="col-lg-3 mb-4">
              <div className="card border-0 shadow-sm">
                <div className="card-body">
                  <h5 className="fw-bold mb-3">
                    Categories
                  </h5>
                  {categories.map((item) => (
                    <button
                      key={item}
                      onClick={() => setCategory(item)}
                      className={`btn w-100 text-start mb-2 ${
                        category === item
                          ? "btn-primary"
                          : "btn-outline-secondary"
                      }`}
                    >
                      {item}
                    </button>
                  ))}
                </div>
              </div>
            </div>
            {/* Products Area */}
            <div className="col-lg-9">
              {/* Search */}
              <div className="input-group mb-4">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Search products..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
                <button className="btn btn-primary">
                  <i className="bi bi-search"></i>
                </button>
              </div>
              {/* Product Grid */}
              <div className="row g-4">
                {filteredProducts.length > 0 ? (
                  filteredProducts.map((product) => (
                    <div
                      className="col-md-6 col-lg-4"
                      key={product.id}
                    >
                      <ProductCard product={product} />
                    </div>
                  ))
                ) : (
                  <div className="col-12 text-center py-5">
                    <h4>No products found</h4>
                    <p className="text-muted">
                      Try another search or category.
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
export default Products;
