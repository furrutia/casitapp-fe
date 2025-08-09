export const Header = ({
    user,
    favoritesCount,
    onShowFavorites,
    onLogout,
    onShowAddForm
}) => (
    <div className="d-flex justify-content-between align-items-center py-2">
        <button className="btn btn-success btn-sm" onClick={onShowAddForm}>
            Agregar casa
        </button>
        <div className="d-flex align-items-center">
            <span className="me-3">Usuario: <strong>{user}</strong></span>
            <button className="btn btn-outline-secondary btn-sm me-2" onClick={onShowFavorites}>
                Favoritos ({favoritesCount})
            </button>
            <button className="btn btn-outline-secondary btn-sm" onClick={onLogout}>
                Logout
            </button>
        </div>
    </div>
);