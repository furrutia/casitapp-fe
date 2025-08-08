import React, { useState } from 'react';
import { Login } from './components/Login';
import { HouseFilter } from './components/HouseFilter';
import { HouseList } from './components/HouseList';
import { HouseDetail } from './components/HouseDetail';

const exampleHouses = [
    {
        id: 1,
        neighborhood: "Prados del Oeste",
        value: 120000,
        rooms: 3,
        bathrooms: 2,
        description: "Casa luminosa con jardín amplio.",
        images: [
            "https://cdn-images.xintelweb.com/upload/ms38474_2.jpg?1747064747"
        ]
    },
    {
        id: 2,
        neighborhood: "Haras Maria Elena",
        value: 150000,
        rooms: 4,
        bathrooms: 3,
        description: "Ideal para familia grande, pileta incluida.",
        images: [
            "https://cdn-images.xintelweb.com/upload/ms38474_2.jpg?1747064747"
        ]
    },
    {
        id: 3,
        neighborhood: "Alvarez del Bosque",
        value: 95000,
        rooms: 2,
        bathrooms: 1,
        description: "Perfecta para pareja joven, cerca de comercios.",
        images: [
            "https://cdn-images.xintelweb.com/upload/ms38474_2.jpg?1747064747"
        ]
    },
    {
        id: 4,
        neighborhood: "Fincas de Alvarez",
        value: 180000,
        rooms: 5,
        bathrooms: 4,
        description: "Casa de lujo con cochera doble.",
        images: [
            "https://cdn-images.xintelweb.com/upload/ms38474_2.jpg?1747064747"
        ]
    },
    {
        id: 5,
        neighborhood: "La Cesarina",
        value: 110000,
        rooms: 3,
        bathrooms: 2,
        description: "Ambientes amplios y modernos.",
        images: [
            "https://cdn-images.xintelweb.com/upload/ms38474_2.jpg?1747064747"
        ]
    },
    {
        id: 6,
        neighborhood: "Solares de Zapiola",
        value: 130000,
        rooms: 3,
        bathrooms: 2,
        description: "Excelente ubicación y seguridad.",
        images: [
            "https://cdn-images.xintelweb.com/upload/ms38474_2.jpg?1747064747"
        ]
    },
    {
        id: 7,
        neighborhood: "Prados del Oeste",
        value: 125000,
        rooms: 4,
        bathrooms: 2,
        description: "Gran patio y quincho.",
        images: [
            "https://cdn-images.xintelweb.com/upload/ms38474_2.jpg?1747064747"
        ]
    },
    {
        id: 8,
        neighborhood: "Haras Maria Elena",
        value: 140000,
        rooms: 3,
        bathrooms: 2,
        description: "Recientemente renovada.",
        images: [
            "https://cdn-images.xintelweb.com/upload/ms38474_2.jpg?1747064747"
        ]
    },
    {
        id: 9,
        neighborhood: "Alvarez del Bosque",
        value: 99000,
        rooms: 2,
        bathrooms: 1,
        description: "Oportunidad única, lista para mudarse.",
        images: [
            "https://cdn-images.xintelweb.com/upload/ms38474_2.jpg?1747064747"
        ]
    },
    {
        id: 10,
        neighborhood: "Fincas de Alvarez",
        value: 175000,
        rooms: 5,
        bathrooms: 3,
        description: "Gran jardín y espacios verdes.",
        images: [
            "https://cdn-images.xintelweb.com/upload/ms38474_2.jpg?1747064747"
        ]
    }
];

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
    const [filteredHouses, setFilteredHouses] = useState(exampleHouses);
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

        const filtered = exampleHouses.filter(house => {
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