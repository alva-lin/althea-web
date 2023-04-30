import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { getHealth } from "../services/health";

const useServerDelay = () => {
  const [ delay, setDelay ] = useState<number | null>(null);
  
  const { data: _ } = useQuery([ "health/getDelay" ], async () => {
    const start = Date.now();
    await getHealth();
    const end = Date.now();
    setDelay(end - start);
    return {};
  }, {
    refetchInterval: 5000,
    refetchIntervalInBackground: false,
    retry: false,
  });
  
  return delay;
};

export default useServerDelay;
