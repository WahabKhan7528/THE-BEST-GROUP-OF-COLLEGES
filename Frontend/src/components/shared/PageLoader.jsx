const PageLoader = () => (
    <div style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh",
        background: "#f8fafc",
    }}>
        <div style={{
            width: 40,
            height: 40,
            border: "3px solid #e2e8f0",
            borderTop: "3px solid #4C5B61",
            borderRadius: "50%",
            animation: "spin 0.7s linear infinite",
        }} />
        <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
);

export default PageLoader;
