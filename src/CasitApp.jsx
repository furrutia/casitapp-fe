import React, { useState } from 'react';
import { Login } from './components/Login';
import { HouseFilter } from './components/HouseFilter';
import { HouseList } from './components/HouseList';
import { HouseDetail } from './components/HouseDetail';
import { dataHouse } from './data/dataHouse';

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
    const [filteredHouses, setFilteredHouses] = useState(dataHouse);
    const [selectedHouse, setSelectedHouse] = useState(null);
    const [favorites, setFavorites] = useState([]);
    const [showFavorites, setShowFavorites] = useState(false);

    const handleLogin = (userData) => {
        setLoggedIn(true);
        setUser(userData.user);
    };

    const handleLogout = () => {
        setLoggedIn(false);
        setUser(null);
    };

    const handleFilterChange = (newFilters) => {
        setFilters(newFilters);

        const filtered = dataHouse.filter(house => {
            const matchValueFrom = !newFilters.valueFrom || house.value >= Number(newFilters.valueFrom);
            const matchValueTo = !newFilters.valueTo || house.value <= Number(newFilters.valueTo);
            const matchNeighborhood = !newFilters.neighborhood || house.neighborhood === newFilters.neighborhood;
            const matchRooms = !newFilters.rooms || house.rooms === Number(newFilters.rooms);
            const matchBathrooms = !newFilters.bathrooms || house.bathrooms === Number(newFilters.bathrooms);
            return matchValueFrom && matchValueTo && matchNeighborhood && matchRooms && matchBathrooms;
        });

        setFilteredHouses(filtered);
    };

    const handleHouseClick = (house) => {
        setShowFavorites(false);
        setSelectedHouse(house);
    };

    const handleBack = () => {
        setSelectedHouse(null);
    };

    const handleAddFavorite = (house) => {
        if (!favorites.some(fav => fav.id === house.id)) {
            setFavorites([...favorites, house]);
        }
    };

    const handleRemoveFavorite = (house) => {
        setFavorites(favorites.filter(fav => fav.id !== house.id));
    };

    const Header = () => (
        <div className="d-flex justify-content-end align-items-center py-2">
            <span className="me-3">Usuario: <strong>{user}</strong></span>
            <button className="btn btn-outline-secondary btn-sm me-2" onClick={() => setShowFavorites(!showFavorites)}>
                Favoritos ({favorites.length})
            </button>
            <button className="btn btn-outline-secondary btn-sm" onClick={handleLogout}>
                Logout
            </button>
        </div>
    );

    if (!loggedIn) {
        return <Login onLogin={handleLogin} />;
    }

    return (
        <div className="container mt-4">
            <Header />
            {showFavorites ? (
                <HouseList
                    houses={favorites}
                    onHouseClick={handleHouseClick}
                    favorites={favorites}
                />
            ) : !selectedHouse ? (
                <>
                    <HouseFilter onFilter={handleFilterChange} />
                    <HouseList
                        houses={filteredHouses}
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
                />
            )}
        </div>
    );
};