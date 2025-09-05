import { FaSearch } from "react-icons/fa";
import { GrSearchAdvanced } from "react-icons/gr";
import { IoIosAddCircle, IoIosPrint } from "react-icons/io";

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
        <div className="actionBtn advancedModeButton">
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
