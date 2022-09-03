import { useEffect, useState } from "react";
import NetInfo from "@react-native-community/netinfo";

const useCheckNetwork = () => {
  const [isConnected, setIsConnected] = useState<boolean | null>(true);

  useEffect(() => {
    const unSubscribe = NetInfo.addEventListener((state) => {
      setIsConnected(state.isConnected);
    });
    return () => unSubscribe();
  }, []);

  return isConnected
};

export default useCheckNetwork;
