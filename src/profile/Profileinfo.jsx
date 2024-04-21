import { useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import axios from "axios";

const Profileinfo = () => {
    const { user, isAuthenticated } = useAuth0();
    const [ip, setIP] = useState("");
    const [location, setLocation] = useState(null);
    const [address, setAddress] = useState("");

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Obtener la dirección IP
                const ipRes = await axios.get("https://api.ipify.org/?format=json");
                const userIP = ipRes.data.ip;
                setIP(userIP);

                // Obtener la información de ubicación
                const locationRes = await axios.get(`https://api.geoapify.com/v1/ipinfo?apiKey=c4483a9a22c74a52850e281789f5e38c&ip=${userIP}`);
                setLocation(locationRes.data);

                // Obtener la dirección a partir de la latitud y longitud
                const { latitude, longitude } = locationRes.data.location;
                const addressRes = await axios.get(`https://api.geoapify.com/v1/geocode/reverse?lat=${latitude}&lon=${longitude}&apiKey=c4483a9a22c74a52850e281789f5e38c`);
                setAddress(addressRes.data.features[0].properties.formatted);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        if (isAuthenticated) {
            fetchData();
        }
    }, [isAuthenticated]);

    return (
        isAuthenticated && (
            <div>
                <h1>Bienvenido, {user.name}</h1>
                <img src={user.picture} alt={user.name} />
                <h2>Tu IP es: {ip}</h2>
                {address && <h2>Dirección: {address}</h2>}
            </div>
        )
    );
};

export default Profileinfo;
