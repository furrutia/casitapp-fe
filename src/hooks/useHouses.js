import { useState } from 'react';
import { filterHouses, sortHouses } from '../services/houseService';

export function useHouses(initialHouses) {
    const [houses, setHouses] = useState(initialHouses);
    const [favorites, setFavorites] = useState([]);
    const [filters, setFilters] = useState({
        valueFrom: '',
        valueTo: '',
        neighborhood: '',
        rooms: '',
        bathrooms: ''
    });

    const filteredHouses = filterHouses(houses, filters);
    
    const sortedHouses = sortHouses(filteredHouses);

    const addHouse = (house) => setHouses([...houses, house]);
    
    const updateHouse = (updatedHouse) =>
        setHouses(houses.map(h => h.id === updatedHouse.id ? updatedHouse : h));

    const addFavorite = (house) => {
        if (!favorites.some(fav => fav.id === house.id)) {
            setFavorites([...favorites, house]);
        }
    };

    const removeFavorite = (house) =>
        setFavorites(favorites.filter(fav => fav.id !== house.id));

    return {
        houses,
        setHouses,
        favorites,
        setFavorites,
        filters,
        setFilters,
        filteredHouses,
        sortedHouses,
        addHouse,
        updateHouse,
        addFavorite,
        removeFavorite
    };
}