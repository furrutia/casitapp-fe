
export const HouseList = ({ houses, onHouseClick, favorites = [] }) => {
    return (
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
                    </tr>
                </thead>
                <tbody>
                    {houses.map((house, idx) => {
                        const isFavorite = favorites.some(
                            fav => fav.id === house.id
                        );
                        return (
                            <tr key={house.id} style={{ cursor: 'pointer' }} onClick={() => onHouseClick(house)}>
                                <td style={{ fontSize: '1.5em', textAlign: 'center' }}>
                                    {isFavorite ? '⭐' : '☆'}
                                </td>
                                <td>{house.neighborhood}</td>
                                <td>${house.value}</td>
                                <td>{house.rooms}</td>
                                <td>{house.bathrooms}</td>
                                <td>{house.description}</td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
};