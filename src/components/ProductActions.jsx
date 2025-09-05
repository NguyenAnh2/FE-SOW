import { FaSearch } from "react-icons/fa";
import { GrSearchAdvanced } from "react-icons/gr";
import { IoIosAddCircle, IoIosPrint } from "react-icons/io";
import { MdClear } from "react-icons/md";

const ProductActions = ({
  translations,
  articleSearch,
  setArticleSearch,
  productSearch,
  setProductSearch,
  setOpenCreateDialog,
  handleKeyPress,
  handleSearch,
  handleExport,
  handleOpenAdvanced,
  showAdvanced,
  minPrice,
  setMinPrice,
  maxPrice,
  setMaxPrice,
  loading,
}) => {
  return (
    <div className="productsActions">
      <div className="searchInputs-improved">
        <div className="search-wrapper">
          <input
            placeholder={translations?.price_list?.search_article_number}
            value={articleSearch}
            onChange={(e) => setArticleSearch(e.target.value)}
            onKeyPress={handleKeyPress}
            disabled={loading}
          />
          <FaSearch
            className="search-icon clickable"
            onClick={handleSearch}
            title="Click to search"
          />
        </div>

        <div className="search-wrapper">
          <input
            placeholder={translations?.price_list?.search_product}
            value={productSearch}
            onChange={(e) => setProductSearch(e.target.value)}
            onKeyPress={handleKeyPress}
            disabled={loading}
          />
          <FaSearch
            className="search-icon clickable"
            onClick={handleSearch}
            title="Click to search"
          />
        </div>
        {showAdvanced && (
          <div className="advancedSearch">
            <label>{translations?.price_list?.price}</label>
            <div className="advancedInputs">
              <div className="search-wrapper">
                <input
                  value={minPrice}
                  onChange={(e) => setMinPrice(e.target.value)}
                  type="number"
                  placeholder="Min"
                />
              </div>
              <div className="search-wrapper">
                <input
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(e.target.value)}
                  type="number"
                  placeholder="Max"
                />
              </div>
            </div>
            <div className="advancedButtons">
              <button
                className="clearButton"
                onClick={() => {
                  setArticleSearch("");
                  setProductSearch("");
                  setMinPrice(0);
                  setMaxPrice(0);
                  handleSearch({
                    articleSearch: "",
                    productSearch: "",
                    minPrice: 0,
                    maxPrice: 0,
                  });
                }}
              >
                <MdClear />
              </button>
              <button
                className="applyButton"
                onClick={() =>
                  handleSearch({
                    articleSearch,
                    productSearch,
                    minPrice,
                    maxPrice,
                  })
                }
              >
                <FaSearch />
              </button>
            </div>
          </div>
        )}
      </div>
      <div className="actionButtons">
        <div
          className="actionBtn newProductButton"
          onClick={() => setOpenCreateDialog(true)}
        >
          <button>{translations?.price_list?.new_product}</button>
          <span>
            <IoIosAddCircle />
          </span>
        </div>
        <div className="actionBtn printButton" onClick={handleExport}>
          <button>{translations?.price_list?.print_list}</button>
          <span>
            <IoIosPrint />
          </span>
        </div>
        <div
          className="actionBtn advancedModeButton"
          onClick={handleOpenAdvanced}
        >
          <button>{translations?.price_list?.advanced_mode}</button>
          <span>
            <GrSearchAdvanced />
          </span>
        </div>
      </div>
    </div>
  );
};

export default ProductActions;
