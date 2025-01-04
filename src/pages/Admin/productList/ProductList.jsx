import './productList.css';
import { Link } from 'react-router-dom';
import { getAllProducts } from '../../../utils/logic/products';
import Loading from '../../../components/common/Loading';
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import SadFaceMsg from '../../../components/ui/SadFaceMsg';

const Table = styled.table`
	width: 100%;
	height: 100%;
	background-color: ${({ theme }) => theme.bg};
`;
const Container = styled.section`
	width: 100vw;
	height: auto;
	display: flex;
	flex-direction: column;
	background-color: ${({ theme }) => theme.bgLighter};
`;

const TableContainer = styled.div`
	max-width: 1200px;
	flex-wrap: wrap;
	width: 100%;
	height: 100%;
	min-height: 100vh;
	justify-content: end;
	margin: auto;
	background-color: ${({ theme }) => theme.bg};
`;

const Td = styled.td`
	text-align: center;
	padding: 1rem;
	color: ${({ theme }) => theme.text};
	border: 0.5px solid lightgray;
`;

const Tr = styled.tr``;
const Th = styled.th`
	text-align: center;
	color: ${({ theme }) => theme.text};
	border: 0.5px solid lightgray;
`;

export default function ProductList() {
	const [products, setProducts] = useState([]);
	const [filteredProducts, setFilteredProducts] = useState([]);
	const [isLoading, setIsLoading] = useState(false);
	const [filter, setFilter] = useState('');
	const [sortCriteria, setSortCriteria] = useState(null);
	const [sortDirection, setSortDirection] = useState('asc');

	useEffect(() => {
		const getProducts = async () => {
			setIsLoading(true);
			try {
				const res = await getAllProducts(1, 1000);
				const transformedProducts = res.data.data.map((product) => ({
					id: product._id,
					name: product.name_es,
					price: product.price_es,
					inStock: product.stock.reduce(
						(acc, stockItem) => acc + stockItem.quantity,
						0
					),
					colors: product.stock.map((stockItem) => stockItem.color),
					sizes: product.stock.map((stockItem) => stockItem.size),
					category: product.category,
				}));
				setProducts(transformedProducts);
				setFilteredProducts(transformedProducts);
			} catch (e) {
				console.error(e);
			} finally {
				setIsLoading(false);
			}
		};

		getProducts();
	}, []);

	const sortProducts = (products, criteria, direction) => {
		if (!criteria) return products;
		return [...products].sort((a, b) => {
			if (direction === 'asc') {
				return a[criteria] > b[criteria] ? 1 : -1;
			}
			return a[criteria] < b[criteria] ? 1 : -1;
		});
	};

	useEffect(() => {
		let result = products.filter((product) =>
			product.name.toLowerCase().includes(filter.toLowerCase())
		);
		result = sortProducts(result, sortCriteria, sortDirection);
		setFilteredProducts(result);
	}, [filter, sortCriteria, sortDirection, products]);

	const handleSort = (criteria) => {
		if (sortCriteria === criteria) {
			setSortDirection((prev) => (prev === 'asc' ? 'desc' : 'asc'));
		} else {
			setSortCriteria(criteria);
			setSortDirection('asc');
		}
	};

	if (!isLoading && products.length === 0) {
		return (
			<Container>
				<SadFaceMsg text="No products found" />
			</Container>
		);
	}

	if (!isLoading && filteredProducts.length === 0) {
		return (
			<Container>
				<SadFaceMsg text="No products found" />
			</Container>
		);
	}

	if (isLoading) {
		return <Loading />;
	}
	return (
		<Container className="productList">
			<TableContainer>
				<input
					style={{
						width: '97%',
						margin: '1rem auto',
						padding: '1rem',
						maxWidth: '1200px',
					}}
					type="text"
					value={filter}
					onChange={(e) => setFilter(e.target.value)}
					placeholder="Filter products by name"
				/>
				<Table>
					<thead>
						<tr>
							<Th>ID</Th>
							<Th title="Click to sort" onClick={() => handleSort('name')}>
								Name{' '}
							</Th>
							<Th title="Click to sort" onClick={() => handleSort('price')}>
								Price{' '}
							</Th>
							<Th title="Click to sort" onClick={() => handleSort('inStock')}>
								Total Stock
							</Th>
							<Th>Colors</Th>
							<Th>Sizes</Th>
							<Th>Category</Th>
						</tr>
					</thead>
					<tbody>
						{filteredProducts.map((product) => (
							<Tr key={product.id}>
								<Td>
									<Link to={`/admin/update/product/${product.id}`}>detail</Link>
								</Td>
								<Td>{product.name}</Td>
								<Td>${product.price}</Td>
								<Td>{product.inStock}</Td>
								<Td>
									{product.colors.map((color) => (
										<span
											key={color}
											style={{
												padding: '0.5rem',
												backgroundColor: color,
												border: '1px solid lightgray',
												margin: '0.2rem',
												borderRadius: '10px',
											}}
										>
											Color
										</span>
									))}
								</Td>
								<Td>{product.sizes.join(', ')}</Td>
								<Td>{product.category}</Td>
							</Tr>
						))}
					</tbody>
				</Table>
			</TableContainer>
		</Container>
	);
}
