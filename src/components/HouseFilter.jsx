import { useState } from 'react';
import { neighborhoods } from '../data';

export const HouseFilter = ({ onFilter, filters }) => {
    const [valueFrom, setValueFrom] = useState(filters.valueFrom || '');
    const [valueTo, setValueTo] = useState(filters.valueTo || '');
    const [neighborhood, setNeighborhood] = useState(filters.neighborhood || '');
    const [rooms, setRooms] = useState(filters.rooms || '');
    const [bathrooms, setBathrooms] = useState(filters.bathrooms || '');

    const handleFilter = (e) => {
        e.preventDefault();
        onFilter({ valueFrom, valueTo, neighborhood, rooms, bathrooms });
    };

    const handleClear = () => {
        setValueFrom('');
        setValueTo('');
        setNeighborhood('');
        setRooms('');
        setBathrooms('');
        onFilter({ valueFrom: '', valueTo: '', neighborhood: '', rooms: '', bathrooms: '' });
    };

    return (
        <form onSubmit={handleFilter} className="mb-4">
            <div className="row g-3 align-items-end">
                <div className="col-md-3">
                    {/* Barrio */}
                    <label className="form-label">Barrio</label>
                    <input
                        type="text"
                        className="form-control"
                        list="neighborhoods"
                        value={neighborhood}
                        onChange={e => setNeighborhood(e.target.value)}
                        placeholder="Seleccione un barrio"
                    />
                    <datalist id="neighborhoods">
                        {neighborhoods.map(barrio => (
                            <option key={barrio} value={barrio} />
                        ))}
                    </datalist>
                </div>
                <div className="col-md-2">
                    {/* Valor desde */}
                    <label className="form-label">Valor desde</label>
                    <input
                        type="number"
                        className="form-control"
                        value={valueFrom}
                        onChange={e => setValueFrom(e.target.value)}
                        placeholder="Ej: 100000"
                    />
                </div>
                <div className="col-md-2">
                    {/* Valor hasta */}
                    <label className="form-label">Valor hasta</label>
                    <input
                        type="number"
                        className="form-control"
                        value={valueTo}
                        onChange={e => setValueTo(e.target.value)}
                        placeholder="Ej: 200000"
                    />
                </div>
                <div className="col-md-2">
                    {/* Ambientes */}
                    <label className="form-label">Ambientes</label>
                    <input
                        type="number"
                        className="form-control"
                        value={rooms}
                        onChange={e => setRooms(e.target.value)}
                        placeholder="Ej: 3"
                    />
                </div>
                <div className="col-md-1">
                    {/* Baños */}
                    <label className="form-label">Baños</label>
                    <input
                        type="number"
                        className="form-control"
                        value={bathrooms}
                        onChange={e => setBathrooms(e.target.value)}
                        placeholder="Ej: 2"
                    />
                </div>
                <div className="col-md-2">
                    <div className="d-flex gap-2 align-items-end h-100">
                        <button type="submit" className="btn btn-primary w-100 h-100">
                            Filtrar
                        </button>
                        <button type="button" className="btn btn-secondary w-100 h-100" onClick={handleClear}>
                            Limpiar
                        </button>
                    </div>
                </div>
            </div>
        </form>
    );
};