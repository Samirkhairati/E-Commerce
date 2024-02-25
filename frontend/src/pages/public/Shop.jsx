import ProductCard from "../../components/ProductCard";
import SearchBar from "../../components/SearchBar";

const Shop = () => {
    return (
        <>
            <SearchBar />
            <section className="mt-8 w-full flex flex-wrap flex-row items-center justify-center">
                <ProductCard />
                <ProductCard />
                <ProductCard />
                <ProductCard />
            </section>


        </>
    );
};

export default Shop;
