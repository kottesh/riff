export const sortTracksByLatest = (tracks) => {
    return [...tracks].sort((a, b) => 
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
};