import { generateTrip } from "@/api/trip/generateTrip";
import { TripGenerateResponse } from "@/types/TripGenerate";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useGenerateTrip = (options?: {
  onSuccess?: (res: TripGenerateResponse) => void;
  onError?: (error: unknown) => void;
}) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: generateTrip,
    onSuccess: (res) => {
      queryClient.invalidateQueries({ queryKey: ["tripList"] });
      queryClient.invalidateQueries({ queryKey: ["tripDetail", res.id] });
      queryClient.invalidateQueries({ queryKey: ["userTripStats"] });
      queryClient.invalidateQueries({ queryKey: ["tripRecommend"] });
      options?.onSuccess?.(res);
    },
    onError: (error) => {
      options?.onError?.(error);
    },
  });
};
