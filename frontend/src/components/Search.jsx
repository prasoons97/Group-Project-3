import { useState } from 'react';

function Search({ products, setFilteredProducts }) {
    const [search, setSearch] = useState("");

    const handleSearch = (e) => {
        const value = e.target.value;
        setSearch(value);

        const filtered = products.filter((product) =>
            product.name.toLowerCase().includes(value.toLowerCase().trim())
        );

        setFilteredProducts(filtered);
    };

    return (
        <input
            type="text"
            placeholder="Search products..."
            value={search}
            onChange={handleSearch}
        />
    );
}

export default Search;