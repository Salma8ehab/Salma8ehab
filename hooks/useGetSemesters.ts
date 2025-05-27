import api from "@/lib/axios";
import { useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";

const useGetSemesters = () => {
  const fetchSemesters = async () => {
    try {
      const res = await api.get<Promise<SemestersApiResponse>>("/semesters/");

      const semesters = (await res.data).data.data;

      console.log("semesters", semesters);

      return semesters;
    } catch (error) {
      toast.error("somthing went wrong");

      console.log(error);
    }
  };

  return useQuery({
    queryKey: ["semesters"],
    queryFn: () => fetchSemesters(),
  });
};

export default useGetSemesters;
