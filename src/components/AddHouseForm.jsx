import { useState } from 'react';
import { neighborhoods } from '../data';

export const AddHouseForm = ({
    onAdd,
    onCancel,
    initialData = {},
    isEdit = false
}) => {
    const [neighborhood, setNeighborhood] = useState(initialData.neighborhood || '');
    const [value, setValue] = useState(initialData.value || '');
    const [rooms, setRooms] = useState(initialData.rooms || '');
    const [bathrooms, setBathrooms] = useState(initialData.bathrooms || '');
    const [description, setDescription] = useState(initialData.description || '');
    const [images, setImages] = useState(initialData.images || []);
    const [preview, setPreview] = useState(initialData.images || []);
    const [error, setError] = useState('');

    const handleImageChange = (e) => {
        const files = Array.from(e.target.files);
        setImages(files);
        const previews = files.map(file => URL.createObjectURL(file));
        setPreview([...preview, ...previews]);
    };

    const handleRemoveImage = (idx) => {
        setPreview(preview.filter((_, i) => i !== idx));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!neighborhoods.includes(neighborhood)) {
            setError('El barrio debe ser uno de los permitidos.');
            return;
        }
        setError('');
        onAdd({
            id: initialData.id || Date.now(),
            neighborhood,
            value: Number(value),
            rooms: Number(rooms),
            bathrooms: Number(bathrooms),
            description,
            images: preview
        });
        onCancel();
    };

    return (
        <div className="card mt-4">
            <div className="card-body">
                <h5 className="card-title mb-3">{isEdit ? 'Modificar casa' : 'Agregar nueva casa'}</h5>
                <form onSubmit={handleSubmit}>
                    <div className="mb-2">
                        <label className="form-label">Barrio</label>
                        <input
                            type="text"
                            className="form-control"
                            list="neighborhoods"
                            value={neighborhood}
                            onChange={e => setNeighborhood(e.target.value)}
                            required
                            placeholder="Seleccione un barrio"
                        />
                        <datalist id="neighborhoods">
                            {neighborhoods.map(barrio => (
                                <option key={barrio} value={barrio} />
                            ))}
                        </datalist>
                        {error && <div className="text-danger mt-1">{error}</div>}
                    </div>
                    <div className="row mb-2">
                        <div className="col-md-4">
                            <label className="form-label">Valor</label>
                            <input type="number" className="form-control" value={value} onChange={e => setValue(e.target.value)} required />
                        </div>
                        <div className="col-md-4">
                            <label className="form-label">Ambientes</label>
                            <input type="number" className="form-control" value={rooms} onChange={e => setRooms(e.target.value)} required />
                        </div>
                        <div className="col-md-4">
                            <label className="form-label">Baños</label>
                            <input type="number" className="form-control" value={bathrooms} onChange={e => setBathrooms(e.target.value)} required />
                        </div>
                    </div>
                    <div className="mb-2">
                        <label className="form-label">Descripción</label>
                        <input type="text" className="form-control" value={description} onChange={e => setDescription(e.target.value)} required />
                    </div>
                    <div className="mb-2">
                        <label className="form-label">Imágenes</label>
                        <input type="file" className="form-control" multiple accept="image/*" onChange={handleImageChange} />
                        <div className="row mt-2">
                            {preview.map((src, idx) => (
                                <div className="col-md-4 mb-2" key={idx}>
                                    <img src={src} alt={`Preview ${idx}`} className="img-fluid rounded" />
                                    <button
                                        type="button"
                                        className="btn btn-sm btn-danger mt-2 w-100"
                                        onClick={() => handleRemoveImage(idx)}
                                    >
                                        Quitar
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="d-flex gap-2 mt-3">
                        <button type="submit" className="btn btn-success">Guardar</button>
                        <button type="button" className="btn btn-secondary" onClick={onCancel}>Cancelar</button>
                    </div>
                </form>
            </div>
        </div>
    );
};