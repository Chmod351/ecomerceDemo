import { useState, useEffect } from 'react';

function useIsMobile() {
	const [isMobile, setIsMobile] = useState(false);
	const [isModalOpen, setIsModalOpen] = useState(false);

	useEffect(() => {
		const handleResize = () => {
			setIsMobile(window.innerWidth < 820);
		};
		if (typeof window !== 'undefined') {
			window.addEventListener('resize', handleResize);

			// Establecer el estado inicial cuando el componente se monta
			handleResize();

			// Limpiar el evento cuando el componente se desmonta
			return () => window.removeEventListener('resize', handleResize);
		}
	}, []);

	return { isMobile, isModalOpen, setIsModalOpen };
}

export default useIsMobile;
