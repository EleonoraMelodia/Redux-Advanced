import ProductItem from "./ProductItem";
import classes from "./Products.module.css";

const DUMMY_PRODUCTS = [
  {
    id: 1,
    title: "pasta",
    price: "2",
    description: "classical italian spaghetti",
  },
  {
    id: 2,
    title: "tomatoes",
    price: "0.7",
    description: "orange tomatoes",
  },
  {
    id: 3,
    title: "flour",
    price: "1",
    description: "white flour for many preparations",
  },
];

const Products = (props) => {
  return (
    <section className={classes.products}>
      <h2>Buy your favorite products</h2>

      {DUMMY_PRODUCTS.map((items) => {
        return (
          <ul key={items.id}>
            <ProductItem
              id={items.id}
              title={items.title}
              price={items.price}
              description={items.description}
            />
          </ul>
        );
      })}
    </section>
  );
};

export default Products;
