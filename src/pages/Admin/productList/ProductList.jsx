import './productList.css';
import { Link } from 'react-router-dom';
import { getAllProducts } from '../../../utils/logic/products';
import Loading from '../../../components/common/Loading';
import { useEffect, useState } from 'react';
import styled from 'styled-components';

const Table = styled.table`
	width: 100%;
	height: 100%;
	background-color: ${({ theme }) => theme.bg};
`;
const Container = styled.section`
	width: 100vw;
	height: 100vh;
	display: flex;
	flex-direction: column;
	background-color: ${({ theme }) => theme.bgLighter};
`;

const TableContainer = styled.div`
	max-width: 1200px;
	width: 100%;
	height: 100%;
	justify-content: end;
	margin: auto;
	background-color: ${({ theme }) => theme.bg};
`;

const Td = styled.td`
	text-align: center;
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
	const [isLoading, setIsLoading] = useState(false);

	useEffect(() => {
		const getProducts = async () => {
			setIsLoading(true);
			try {
				const res = await getAllProducts(1, 1000);
				// Transform data to match DataGrid's requirements
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
					img: product.image_url[0] || 'logo.svg', // Default image
				}));
				setProducts(transformedProducts);
			} catch (e) {
				console.error(e);
			} finally {
				setIsLoading(false);
			}
		};

		getProducts();
	}, []);

	if (isLoading) {
		return <Loading />;
	}
	console.log(products);

	return (
		<Container className="productList">
			<TableContainer>
				<Table>
					<thead>
						<tr>
							<Th>ID</Th>
							<Th>Name</Th>
							<Th>Price</Th>
							<Th>Total Stock</Th>
							<Th>Colors</Th>
							<Th>Sizes</Th>
						</tr>
					</thead>
					<tbody>
						{products.map((product) => (
							<Tr key={product.id}>
								<Td>
									<Link to={`/admin/product/${product.id}`}>{product.id}</Link>
								</Td>
								<Td>{product.name}</Td>
								<Td>${product.price}</Td>
								<Td> {product.inStock}</Td>
								<Td>{product.colors.join(', ')}</Td>
								<Td>{product.sizes.join(', ')}</Td>
							</Tr>
						))}
					</tbody>
				</Table>
			</TableContainer>
		</Container>
	);
}
