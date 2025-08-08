import { useState } from 'react';

export const HouseDetail = ({ house, onBack, onAddFavorite, onRemoveFavorite, isFavorite }) => {
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
                <h3 className="card-title mb-3">{house.neighborhood}</h3>
                <p><strong>Valor:</strong> ${house.value}</p>
                <p><strong>Ambientes:</strong> {house.rooms}</p>
                <p><strong>Baños:</strong> {house.bathrooms}</p>
                <p><strong>Descripción:</strong> {house.description}</p>
                <div className="mb-3">
                    <strong>Imágenes:</strong>
                    <div className="row">
                        {house.images && house.images.map((img, idx) => (
                            <div className="col-md-4 mb-2" key={idx}>
                                <img src={img} alt={`Casa ${idx}`} className="img-fluid rounded" />
                            </div>
                        ))}
                    </div>
                </div>
                {showAlert && (
                    // <div className="alert alert-success" role="alert">
                    //     {isFavorite ? '¡Casa agregada a favoritos!' : '¡Casa quitada de favoritos!'}
                    // </div>
                    ( isFavorite && 
                        <div className="alert alert-success" role="alert">
                            ¡Casa agregada a favoritos!
                        </div>
                    ) ||
                    ( !isFavorite && 
                        <div className="alert alert-danger" role="alert">
                            ¡Casa quitada de favoritos!
                        </div>
                    )
                )}
                {isFavorite ? (
                    <button className="btn btn-danger me-2" onClick={handleRemoveFavorite}>
                        Quitar de Favoritos
                    </button>
                ) : (
                    <button className="btn btn-primary me-2" onClick={handleAddFavorite}>
                        Agregar a Favoritos
                    </button>
                )}
                <button className="btn btn-secondary" onClick={onBack}>Volver</button>
            </div>
        </div>
    );
};