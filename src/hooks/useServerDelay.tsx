import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import AppEnv from "../common/env.ts";
import { getHealth } from "../services/health";

const useServerDelay = () => {
  const [ delay, setDelay ] = useState<number | null>(null);
  
  const { data: _ } = useQuery([ "health/getDelay" ], async () => {
    const start = Date.now();
    if (AppEnv.App.CheckHealth) {
      console.log(AppEnv.App);
      try {
        await getHealth();
      } catch (e) {
        setDelay(9999);
        return {};
      }
    }
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
