export const generateHudumaNumber = (): string => {
	const hudumaNumber = new Date().getTime().toString().slice(5, 13);

	return hudumaNumber;
};

