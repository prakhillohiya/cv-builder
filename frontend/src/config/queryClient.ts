import { QueryClient, useMutation, useQuery } from "@tanstack/react-query";
import  { AxiosResponse } from "axios";
import axios from './axios'
import toast from "react-hot-toast";

interface IResponse<T = any> {
  data: T;
  message: string;
}

export interface ICustomQuery {
  queryKey:string
  url: string;
  method: string;
  enabled:boolean
}

export interface IMutationQuery {
  mutationKey:string
  url: string;
  method: string;
  successCallback:()=>void
}

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 0,
      refetchOnWindowFocus:false,
    },
    mutations: {},
  },
});

// useEffect(() => {
//   return () => {
//     queryClient.clear();
//     queryClient.unmount()
//   };
// }, [queryClient]);


// export const QueryClientProviderWrapper = ({ children }) => {
//   const queryClient = useQueryClient();
//   return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
// };

// export const QueryDevtools = () => <ReactQueryDevtools />;

export const useCustomQueryClient = <T>({ queryKey,method, url,enabled }: ICustomQuery) => {
  const query = useQuery<AxiosResponse<IResponse<T>>, Error>({
    queryKey: [queryKey],
    queryFn: ()=> {
      return toast.promise(
        axios<IResponse>({
          method: `${method}`,
          url: `${import.meta.env.VITE_BASE_URI}${url}`,
          withCredentials:true,
        }),
        {
          error: (err) => err.message,
          success: (data) => data.data.message,
          loading: "Loading",
        }
      )
    },
    enabled: enabled,   
    refetchOnWindowFocus: false
  });


  return query;
};

export const useCustomMutationClient = <T>({ mutationKey,method, url,successCallback }: IMutationQuery) => {
  const mutation = useMutation({
    mutationKey:[mutationKey],
    mutationFn: (body:T) => {
      return toast.promise(
        axios<IResponse>({
          method: `${method}`,
          url: `${import.meta.env.VITE_BASE_URI}${url}`,
          data: body,
          withCredentials:true
        }),
        {
          error: (err) => err.response.data.message,
          success: (data) => data.data.message,
          loading: "Loading",
        }
      );
    },
    onSuccess:successCallback
  });

  return mutation;
};
