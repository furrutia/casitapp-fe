import { useState } from 'react';
import { Login } from './components/Login';
import { HouseFilter } from './components/HouseFilter';
import { HouseList } from './components/HouseList';
import { HouseDetail } from './components/HouseDetail';
import { AddHouseForm } from './components/AddHouseForm';
import { Header } from './components/Header';
import { useHouses } from './hooks/useHouses';
import { initialHouses } from './data';

export const CasitApp = () => {
    const [loggedIn, setLoggedIn] = useState(false);
    const [user, setUser] = useState(null);
    const [showFavorites, setShowFavorites] = useState(false);
    const [showAddForm, setShowAddForm] = useState(false);
    const [editHouse, setEditHouse] = useState(null);
    const [selectedHouse, setSelectedHouse] = useState(null);

    const {
        houses,
        setHouses,
        favorites,
        setFavorites,
        filters,
        setFilters,
        sortedHouses,
        addHouse,
        updateHouse,
        addFavorite,
        removeFavorite
    } = useHouses(initialHouses);

    const handleLogin = ({ user }) => {
        setLoggedIn(true);
        setUser(user);
    };

    const handleLogout = () => {
        setLoggedIn(false);
        setUser(null);
    };

    const handleFilterChange = (newFilters) => setFilters(newFilters);

    const handleHouseClick = (house) => setSelectedHouse(house);

    const handleBack = () => setSelectedHouse(null);

    if (!loggedIn) {
        return <Login onLogin={handleLogin} />;
    }

    return (
        <div className="container mt-4">
            <Header
                user={user}
                favoritesCount={favorites.length}
                onShowFavorites={() => setShowFavorites(true)}
                onLogout={handleLogout}
                onShowAddForm={() => setShowAddForm(true)}
            />
            {editHouse ? (
                <AddHouseForm
                    initialData={editHouse}
                    onAdd={updatedHouse => {
                        updateHouse(updatedHouse);
                        setEditHouse(null);
                        setSelectedHouse(updatedHouse);
                    }}
                    onCancel={() => setEditHouse(null)}
                    isEdit={true}
                />
            ) : showAddForm ? (
                <AddHouseForm
                    onAdd={newHouse => {
                        addHouse(newHouse);
                        setShowAddForm(false);
                        setSelectedHouse(null);
                        setShowFavorites(false);
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
                    onAddFavorite={addFavorite}
                    onRemoveFavorite={removeFavorite}
                    isFavorite={favorites.some(fav => fav.id === selectedHouse.id)}
                    onEdit={() => setEditHouse(selectedHouse)}
                />
            )}
        </div>
    );
};