import { ArrowLeftRounded, ArrowRightRounded } from '@material-ui/icons';
import styled from 'styled-components';

const PaginationContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 1rem;
`;

const PageButton = styled.button`
  background-color: ${(props) => (props.active ? '#333' : '#fff')};
  color: ${(props) => (props.active ? '#fff' : '#333')};
  border: 1px solid #ccc;
  padding: 0rem 1rem;
  margin: 0 0.3rem;
  cursor: pointer;
  font-size: 1rem;
  font-weight: 'bold';

  &:hover {
    background-color: ${({ theme }) => theme.hover};
    color: ${({ theme }) => theme.bg};
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
  &:focus {
    background-color: ${({ theme }) => theme.bgLighter};
    border: 0.1px solid ${({ theme }) => theme.hover};
    color: ${({ theme }) => theme.text};
  }
`;
const Icon = styled.div`
  width: 2.5rem;
  height: 2.5rem;
  background-color: ${({ theme }) => theme.hover};
  display: flex;
  align-items: center;
  cursor: pointer;
  justify-content: center;
  color: ${({ theme }) => theme.bg};
  border: 0.1px solid ${({ theme }) => theme.hover};
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
  &:hover {
    background-color: ${({ theme }) => theme.bgLighter};
    border: 0.1px solid ${({ theme }) => theme.hover};
    color: ${({ theme }) => theme.text};
  }
  &:focus {
    background-color: ${({ theme }) => theme.bgLighter};
    border: 0.1px solid ${({ theme }) => theme.hover};
    color: ${({ theme }) => theme.text};
  }
`;

const Pagination = ({
  filteredProducts,
  totalPages,
  currentPage,
  handlePageChange,
}) => {
  return (
    <>
      {filteredProducts.length >= 8 && totalPages > 1 && (
        <PaginationContainer tabIndex="0">
          {/* Botón de página anterior */}
          <Icon
            title="previous"
            aria-label="go to previous page"
            role="navigation"
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            onKeyUp={(e) => {
              if (e.key === 'Enter') {
                handlePageChange(currentPage - 1);
              }
            }}
            tabIndex="0"
            style={{ pointerEvents: currentPage === 1 ? 'none' : 'auto' }}
          >
            <ArrowLeftRounded />
          </Icon>
          {/* Botones de número de página */}
          {[...Array(totalPages)].map((_, index) => (
            <PageButton
              title={index + 1}
              role="list"
              aria-label={index + 1}
              key={index + 1}
              active={index + 1 === currentPage}
              onClick={() => handlePageChange(index + 1)}
              tabIndex="0"
            >
              {index + 1}
            </PageButton>
          ))}
          {/* Botón de página siguiente */}
          <Icon
            title="next"
            aria-label="go to next page"
            role="navigation"
            onClick={() => handlePageChange(currentPage + 1)}
            onKeyUp={(e) => {
              if (e.key === 'Enter') {
                handlePageChange(currentPage + 1);
              }
            }}
            tabIndex="0"
            disabled={currentPage === totalPages}
            style={{
              pointerEvents: currentPage === totalPages ? 'none' : 'auto',
            }}
          >
            <ArrowRightRounded />
          </Icon>
        </PaginationContainer>
      )}
      {/*   : ( */}
        {/* // Renderiza un botón de página anterior si no hay suficientes productos o solo hay una página */}
        {/* <PaginationContainer */}
        {/*   title="previous" */}
        {/*   aria-label="go to previous page" */}
        {/*   role="navigation" */}
        {/* > */}
        {/*   <PageButton */}
        {/*     onClick={() => handlePageChange(currentPage - 1)} */}
        {/*     disabled={currentPage === 1} */}
        {/*     onKeyUp={(e) => { */}
        {/*       if (e.key === 'Enter') { */}
        {/*         handlePageChange(currentPage - 1); */}
        {/*       } */}
        {/*     }} */}
        {/*     tabIndex="0" */}
        {/*   > */}
        {/*     Back */}
        {/*   </PageButton> */}
        {/* </PaginationContainer> */}
      {/* ) */} 
    </>
  );
};
export default Pagination;
