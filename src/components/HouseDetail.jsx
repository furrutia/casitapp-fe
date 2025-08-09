import { useState } from 'react';

export const HouseDetail = ({ house, onBack, onAddFavorite, onRemoveFavorite, isFavorite, onEdit }) => {
    const [showAlert, setShowAlert] = useState(false);

    const handleAddFavorite = () => {
        onAddFavorite(house);
        setShowAlert(true);
        setTimeout(() => setShowAlert(false), 2000);
    };

    const handleRemoveFavorite = () => {
        onRemoveFavorite(house);
        setShowAlert(true);
        setTimeout(() => setShowAlert(false), 2000);
    };

    return (
        <div className="card mt-4">
            <div className="card-body">
                <div className="d-flex justify-content-between align-items-center mb-3">
                    <h3 className="card-title mb-0">{house.neighborhood}</h3>
                    {isFavorite && (
                        <button className="btn btn-danger btn-sm" onClick={handleRemoveFavorite}>
                            Quitar de Favoritos
                        </button>
                    )}
                    {!isFavorite && (
                        <button className="btn btn-primary btn-sm" onClick={handleAddFavorite}>
                            Agregar a Favoritos
                        </button>
                    )}
                </div>
                <p><strong>Valor:</strong> ${house.value}</p>
                <p><strong>Ambientes:</strong> {house.rooms}</p>
                <p><strong>Baños:</strong> {house.bathrooms}</p>
                <p><strong>Descripción:</strong> {house.description}</p>
                <div className="mb-3">
                    <strong>Imágenes:</strong>
                    <div className="row">
                        {house.images && house.images.length > 0 ? (
                            house.images.map((img, idx) => (
                                <div className="col-md-4 mb-2" key={idx}>
                                    <img src={img} alt={`Casa ${idx}`} className="img-fluid rounded" />
                                </div>
                            ))
                        ) : (
                            <div className="col-12 text-center text-muted py-4">
                                SIN IMAGENES
                            </div>
                        )}
                    </div>
                </div>
                {showAlert && (
                    <div
                        className={`alert ${isFavorite ? 'alert-success' : 'alert-danger'}`}
                        role="alert"
                    >
                        {isFavorite ? '¡Casa agregada a favoritos!' : '¡Casa quitada de favoritos!'}
                    </div>
                )}
                <div className="d-flex gap-2 mt-3">
                    <button className="btn btn-secondary" onClick={onBack}>Volver</button>
                    <button className="btn btn-warning" onClick={onEdit}>Modificar</button>
                </div>
            </div>
        </div>
    );
};