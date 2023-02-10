import React, { useState, useEffect } from "react";
import ProductsList from "../../page/productsPage";
import Spinner from "../../components/ui/spinner";
import SortingRender from "../../page/productsPage/sortingRender";
import { paginate } from "../../utils/paginate";
import Pagination from "../../page/productsPage/pagination";
import Sliders from "../../components/pageUi/sliders/sliders";
import { useSelector, useDispatch } from "react-redux";
import ModalOpen from "../../components/ui/hoc/modalOpen";
import { getIsLoggedIn } from "../../store/users";
import {
    getProducts,
    getProductsLoadingStatus,
    loadProductsList
} from "../../store/products";
import {
    getCategoriesList,
    getCategoriesLoadingStatus
} from "../../store/categories";
import _ from "lodash";

const Main = () => {
    const LoggedIn = useSelector(getIsLoggedIn());
    const products = useSelector(getProducts());
    const dispatch = useDispatch();
    const isLoadingProducts = useSelector(getProductsLoadingStatus());
    useEffect(() => {
        dispatch(loadProductsList());
    }, []);
    const isLoadingCategories = useSelector(getCategoriesLoadingStatus());
    const categories = useSelector(getCategoriesList());
    const [searchQuery, setSearchQuery] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [selectedCategory, setSelectedCategory] = useState();
    const [sortBy, setSortBy] = useState({ path: "name", order: "desc" });
    useEffect(() => {
        setCurrentPage(1);
    }, [selectedCategory, searchQuery]);
    const handleSearchQuery = ({ target }) => {
        setSelectedCategory(undefined);

        setSearchQuery(target.value);
    };
    const handlePageChange = (pageIndex) => {
        setCurrentPage(pageIndex);
    };
    const handleCategoriesSelect = (item) => {
        setSelectedCategory(item);
    };
    if (products) {
        const filteredProducts = searchQuery
            ? products.filter(
                  (product) =>
                      product.name
                          .toLowerCase()
                          .indexOf(searchQuery.toLowerCase()) !== -1
              )
            : selectedCategory
            ? products.filter(
                  (product) =>
                      JSON.stringify(product.category) ===
                      JSON.stringify(selectedCategory._id)
              )
            : products;

        const handleSort = (item) => {
            setSortBy(item);
        };

        const sortedProducts = _.orderBy(
            filteredProducts,
            [sortBy.path],
            [sortBy.order]
        );
        const pageSize = 8;
        const count = filteredProducts.length;
        const productsCrop = paginate(sortedProducts, currentPage, pageSize);

        const clearFilter = (textInputSearch) => {
            setSelectedCategory();
            setSearchQuery("");
            textInputSearch.current.value = "";
        };

        return (
            <>
                {LoggedIn ? <ModalOpen /> : <></>}
                {!isLoadingCategories && !isLoadingProducts ? (
                    <>
                        <Sliders
                            selectedItem={selectedCategory}
                            items={categories}
                            onItemSelect={handleCategoriesSelect}
                        />
                        <SortingRender
                            onSort={handleSort}
                            selectedSort={sortBy}
                            onClearFilter={clearFilter}
                            onHandleSearchQuery={handleSearchQuery}
                            onSearchQuery={searchQuery}
                        />
                        <ProductsList items={productsCrop} />
                        <Pagination
                            itemsCount={count}
                            pageSize={pageSize}
                            currentPage={currentPage}
                            onPageChange={handlePageChange}
                        />
                    </>
                ) : (
                    <Spinner />
                )}
            </>
        );
    }
};
export default Main;
