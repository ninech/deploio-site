import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import camelcaseKeys from "camelcase-keys";

import { api } from "./config/api-config";
import type { ProductsResponse } from "./service-types";

type useProjectReviewsProps = {
  skip?: boolean;
};

export const useProducts = ({ skip }: useProjectReviewsProps = {}) => {
  const { data, error, isLoading, refetch } = useQuery<ProductsResponse, Error>(
    {
      queryKey: ["products"],
      queryFn: async () => requestHandler(),
      enabled: !skip,
      refetchOnWindowFocus: false,
    }
  );

  return {
    loading: isLoading,
    error: error ?? undefined,
    data,
    refetch,
  };
};

const requestHandler = async () => {
  return handlerException();
};

const handlerException = async () => {
  try {
    const { data } = await api.get<ProductsResponse>("/product");

    return camelcaseKeys(data, {
      deep: true,
    });
  } catch (error) {
    console.error(error);
    if (error instanceof AxiosError) {
      const errorMessage = error.message;
      throw new Error(errorMessage);
    }
    throw error;
  }
};
