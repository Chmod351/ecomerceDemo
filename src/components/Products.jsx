import { useCallback, useEffect, useState } from 'react';
import styled from 'styled-components';
import Product from './Product';
import { mobile } from '../responsive';
import { getProductsFunction } from '../utils/logic/products.js';

// ui
import Loading from './ui/Loading';
import Pagination from './ui/Pagination';

const Container = styled.section`
  padding: 2rem 0;
  background-color: ${({ theme }) => theme.bg};
`;

const Wrapper = styled.div`
  max-width: 1200px;
  margin: auto;
  padding: 1.25rem;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  ${mobile({ alignItems: 'center', justifyContent: 'center' })}
`;

const Products = ({ tag, filters, sort, query }) => {
  // Estado para almacenar los productos y los productos filtrados
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  // Estado para controlar la paginación
  const [showPagination, setShowPagination] = useState(true);

  const [pageSize, setPageSize] = useState(8);
  const [totalPages, setTotalPages] = useState(0);

  // Maneja el cambio de página

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  // Función para obtener los productos
  const getProducts = useCallback(async () => {
    const res = await getProductsFunction(currentPage, pageSize, tag, query);
    // Actualiza el estado de los productos y el número total de páginas
    if (res.data.products) {
      setProducts(res.data.products);
    } else if (res.data) {
      setProducts(res.data);
    } else {
      setProducts([]);
    }
    setTotalPages(res.data.totalPages);
  }, [tag, currentPage, pageSize, query]);

  // Llama a la función getProducts al montar el componente o cuando cambian los parámetros
  useEffect(async () => {
    await getProducts();
  }, [getProducts]);

  // Filtra los productos según los parámetros de filtro y actualiza los productos filtrados
  useEffect(() => {
    if (products.length > 0) {
      if (tag || query) {
        const filtered = filters
          ? products.filter((item) =>
              Object.entries(filters).every(([key, value]) =>
                item[key] ? item[key].includes(value) : false,
              ),
            )
          : products;
        setFilteredProducts(filtered);
        setShowPagination(filtered.length > 8);
      } else {
        setFilteredProducts(products);
        setShowPagination(products.length > 8);
      }
    }
  }, [products, tag, filters, query]);

  // Ordena los productos según el tipo de orden seleccionado (newest, asc, desc)
  useEffect(() => {
    if (sort === 'newest') {
      setFilteredProducts((prev) =>
        [...prev].sort((a, b) => a.createdAt - b.createdAt),
      );
    } else if (sort === 'asc') {
      setFilteredProducts((prev) =>
        [...prev].sort((a, b) => b.price - a.price),
      );
    } else {
      setFilteredProducts((prev) =>
        [...prev].sort((a, b) => a.price - b.price),
      );
    }
  }, [sort]);

  return (
    // renderiza los productos y si no cargaron, renderiza el componente Loading
    <Container id="Products">
      {products.length > 0 ? (
        <Wrapper>
          {tag || query
            ? filteredProducts.map((product) => (
                <Product
                  product={product}
                  key={product._id}
                  price={product.price}
                />
              ))
            : products.map((product) => (
                <Product
                  product={product}
                  key={product._id}
                  price={product.price}
                />
              ))}
        </Wrapper>
      ) : (
        <Loading />
      )}

      {/* Renderizar paginación */}

      <Pagination
        filteredProducts={filteredProducts}
        totalPages={totalPages}
        currentPage={currentPage}
        handlePageChange={handlePageChange}
      />
    </Container>
  );
};

export default Products;
