export const HouseList = ({ houses, onHouseClick, favorites = [] }) => (
    <div className="mt-4">
        <table className="table table-striped">
            <thead>
                <tr>
                    <th>Favorito</th>
                    <th>Barrio</th>
                    <th>Valor</th>
                    <th>Ambientes</th>
                    <th>Baños</th>
                    <th>Descripción</th>
                    <th>Imágenes</th>
                </tr>
            </thead>
            <tbody>
                {houses.map((house, idx) => {
                    const isFavorite = favorites.some(fav => fav.id === house.id);
                    const imageCount = house.images && house.images.length > 0 ? house.images.length : "NO TIENE";
                    //const prevBarrio = idx > 0 ? houses[idx - 1].neighborhood : null;
                    //const showSeparator = prevBarrio && prevBarrio !== house.neighborhood;
                    return (
                        <>
                            {/* {showSeparator && (
                                <tr>
                                    <td colSpan={7} style={{ borderTop: '4px solid black', padding: 0 }}></td>
                                </tr>
                            )} */}
                            <tr key={house.id} style={{ cursor: 'pointer' }} onClick={() => onHouseClick(house)}>
                                <td style={{ fontSize: '1.5em', textAlign: 'center' }}>
                                    {isFavorite ? '⭐' : '☆'}
                                </td>
                                <td>{house.neighborhood}</td>
                                <td>${house.value}</td>
                                <td>{house.rooms}</td>
                                <td>{house.bathrooms}</td>
                                <td>{house.description}</td>
                                <td>{imageCount}</td>
                            </tr>
                        </>
                    );
                })}
            </tbody>
        </table>
    </div>
);