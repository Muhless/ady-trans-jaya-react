const [otherUsers, setOtherUsers] = useState({});
const userId = "user123"; // Gantilah dengan ID unik pengguna

useEffect(() => {
  const sendLocation = async () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(async (position) => {
        await fetch("http://localhost:3000/update-location", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            userId,
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          }),
        });
      });
    }
  };

  sendLocation();
  const interval = setInterval(sendLocation, 5000);
  return () => clearInterval(interval);
}, []);

useEffect(() => {
  const fetchOtherUsers = async () => {
    const response = await fetch("http://localhost:3000/get-location/user456"); // ID orang lain
    const data = await response.json();
    setOtherUsers((prev) => ({ ...prev, user456: data }));
  };

  const interval = setInterval(fetchOtherUsers, 5000);
  return () => clearInterval(interval);
}, []);
