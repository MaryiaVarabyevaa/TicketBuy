export function clearStorage() {
    let session = sessionStorage.getItem('session');
    if (session === null) {
        localStorage.removeItem('isAuth');
        localStorage.removeItem('isAdmin');
        localStorage.removeItem('isModerator');
        localStorage.removeItem('currentUser');
        localStorage.removeItem('currentFilm');
    }
    sessionStorage.setItem('session', 'true');
}