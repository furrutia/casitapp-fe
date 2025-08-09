export function filterHouses(houses, filters) {
    return houses.filter(house => {
        const matchValueFrom = !filters.valueFrom || house.value >= Number(filters.valueFrom);
        const matchValueTo = !filters.valueTo || house.value <= Number(filters.valueTo);
        const matchNeighborhood = !filters.neighborhood || house.neighborhood === filters.neighborhood;
        const matchRooms = !filters.rooms || house.rooms === Number(filters.rooms);
        const matchBathrooms = !filters.bathrooms || house.bathrooms === Number(filters.bathrooms);
        return matchValueFrom && matchValueTo && matchNeighborhood && matchRooms && matchBathrooms;
    });
}

export function sortHouses(houses) {
    return [...houses].sort((a, b) => {
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
}