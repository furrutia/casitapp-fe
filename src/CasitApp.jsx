import { useState } from 'react';
import { Login } from './components/Login';
import { HouseFilter } from './components/HouseFilter';
import { HouseList } from './components/HouseList';
import { HouseDetail } from './components/HouseDetail';
import { dataHouse } from './data';
import { AddHouseForm } from './components/AddHouseForm';

export const CasitApp = () => {
    const [loggedIn, setLoggedIn] = useState(false);
    const [user, setUser] = useState(null);
    const [filters, setFilters] = useState({
        valueFrom: '',
        valueTo: '',
        neighborhood: '',
        rooms: '',
        bathrooms: ''
    });
    const [selectedHouse, setSelectedHouse] = useState(null);
    const [favorites, setFavorites] = useState([]);
    const [showFavorites, setShowFavorites] = useState(false);
    const [showAddForm, setShowAddForm] = useState(false);
    const [houses, setHouses] = useState(dataHouse); // Usa este array en vez de exampleHouses directamente
    const [editHouse, setEditHouse] = useState(null);

    // Filtrado centralizado
    const filteredHouses = houses.filter(house => {
        const matchValueFrom = !filters.valueFrom || house.value >= Number(filters.valueFrom);
        const matchValueTo = !filters.valueTo || house.value <= Number(filters.valueTo);
        const matchNeighborhood = !filters.neighborhood || house.neighborhood === filters.neighborhood;
        const matchRooms = !filters.rooms || house.rooms === Number(filters.rooms);
        const matchBathrooms = !filters.bathrooms || house.bathrooms === Number(filters.bathrooms);
        return matchValueFrom && matchValueTo && matchNeighborhood && matchRooms && matchBathrooms;
    });

    const sortedHouses = [...filteredHouses].sort((a, b) => {
        if (a.neighborhood < b.neighborhood) return -1;
        if (a.neighborhood > b.neighborhood) return 1;
        if (a.value < b.value) return -1;
        if (a.value > b.value) return 1;
        if (a.rooms < b.rooms) return -1;
        if (a.rooms > b.rooms) return 1;
        if (a.bathrooms < b.bathrooms) return -1;
        if (a.bathrooms > b.bathrooms) return 1;
        return 0;
    });

    // Callbacks simples
    const handleLogin = ({ user }) => {
        setLoggedIn(true);
        setUser(user);
    };

    const handleLogout = () => {
        setLoggedIn(false);
        setUser(null);
    };

    const handleFilterChange = (newFilters) => setFilters(newFilters);

    const handleHouseClick = (house) => {
        setShowFavorites(false);
        setSelectedHouse(house);
    }

    const handleBack = () => setSelectedHouse(null);

    const handleAddFavorite = (house) => {
        if (!favorites.some(fav => fav.id === house.id)) {
            setFavorites([...favorites, house]);
        }
    };

    const handleRemoveFavorite = (house) => {
        setFavorites(favorites.filter(fav => fav.id !== house.id));
    };

    const Header = () => (
        <div className="d-flex justify-content-between align-items-center py-2">
            <button className="btn btn-success btn-sm" onClick={() => setShowAddForm(true)}>
                Agregar casa
            </button>
            <div className="d-flex align-items-center">
                <span className="me-3">Usuario: <strong>{user}</strong></span>
                <button className="btn btn-outline-secondary btn-sm me-2" onClick={() => setShowFavorites(!showFavorites)}>
                    Favoritos ({favorites.length})
                </button>
                <button className="btn btn-outline-secondary btn-sm" onClick={handleLogout}>
                    Logout
                </button>
            </div>
        </div>
    );

    if (!loggedIn) return <Login onLogin={handleLogin} />;

    return (
        <div className="container mt-4">
            <Header />
            {editHouse ? (
                <AddHouseForm
                    initialData={editHouse}
                    onAdd={updatedHouse => {
                        setHouses(houses.map(h => h.id === updatedHouse.id ? updatedHouse : h));
                        setEditHouse(null);
                        setSelectedHouse(updatedHouse);
                    }}
                    onCancel={() => setEditHouse(null)}
                    isEdit={true}
                />
            ) : showAddForm ? (
                <AddHouseForm
                    onAdd={newHouse => {
                        setHouses([...houses, newHouse]);
                        setShowAddForm(false); // Oculta el formulario y muestra la lista actualizada
                        setSelectedHouse(null); // Asegura que no se muestre el detalle
                        setShowFavorites(false); // Asegura que no se muestre favoritos
                    }}
                    onCancel={() => setShowAddForm(false)}
                />
            ) : showFavorites ? (
                <>
                    <HouseList
                        houses={favorites}
                        onHouseClick={handleHouseClick}
                        favorites={favorites}
                    />
                    <div className="mt-3 text-end">
                        <button className="btn btn-secondary" onClick={() => setShowFavorites(false)}>
                            Volver
                        </button>
                    </div>
                </>
            ) : !selectedHouse ? (
                <>
                    <HouseFilter onFilter={handleFilterChange} filters={filters} />
                    <HouseList
                        houses={sortedHouses}
                        onHouseClick={handleHouseClick}
                        favorites={favorites}
                    />
                </>
            ) : (
                <HouseDetail
                    house={selectedHouse}
                    onBack={handleBack}
                    onAddFavorite={handleAddFavorite}
                    onRemoveFavorite={handleRemoveFavorite}
                    isFavorite={favorites.some(fav => fav.id === selectedHouse.id)}
                    onEdit={() => setEditHouse(selectedHouse)}
                />
            )}
        </div>
    );
};